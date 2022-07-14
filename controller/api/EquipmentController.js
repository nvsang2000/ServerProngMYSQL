var { validationResult } = require("express-validator");
var cloudinary = require("../../middleware/cloudinary");
var Equipment = require("../../models/equipment");
var { MESSAGE } = require("../../constant/index");

class EquipmentController {
  getAllEquipment = async (req, res) => {
    try {
      Equipment.find(function (err, result) {
        if (result)
          return res.status(200).json({ success: true, data: result });
        else {
          return res.status(300).json({ success: false, message: MESSAGE.GET_NULL });
        }
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: MESSAGE.SERVER_ERR });
    }
  };
  getEquipment = (req, res) => {
    const equipmentID = req.params.id;
    try {
      Equipment.findById(equipmentID, function (err, result) {
        if (result)
          return res.status(200).json({ success: true, data: result });
        else {
          return res
            .status(300)
            .json({ success: false, message: MESSAGE.ID_NOT_EXIST });
        }
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  };
  postEquipment = async (req, res) => {
    var errors = validationResult(req);
    var arrayError = errors.array();
    if (arrayError.length > 0) {
      var message = [];
      arrayError.forEach((element) => {
        message.push(element.msg);
      });
      return res.status(500).json({ success: false, message: message });
    }
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        upload_preset: "upload_avata",
      });
      req.body.url_image = result.url;
    }
    try {
      Equipment.insert(req.body, function (err, result) {
        if (result)
          return res.status(200).json({ success: true, data: result });
        else {
          return res.status(300).json({ success: false, message: err });
        }
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  };
  deleteEquipment = async (req, res) => {
    const equipmentID = req.params.id;
    try {
      Equipment.findById(equipmentID, function (err, result) {
        if (result) {
          Equipment.deleteById(equipmentID, function (err, result) {
            if (result)
              return res.status(200).json({
                success: true,
                message: MESSAGE.DELETE_SUCCESS,
              });
          });
        } else {
          return res
            .status(300)
            .json({ success: false, message: MESSAGE.ID_NOT_EXIST });
        }
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  };
  putEquipment = async(req, res) => {
    const equipmentID = req.params.id;
    console.log("id: ", equipmentID);
    var errors = validationResult(req);
    var arrayError = errors.array();
    if (arrayError.length > 0) {
      var message = [];
      arrayError.forEach((element) => {
        message.push(element.msg);
      });
      return res.status(500).json({ success: false, message: message });
    }
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        upload_preset: "upload_avata",
      });
      req.body.url_image = result.url;
    }
    try {
      Equipment.findById(equipmentID, function (err, result) {
        if (result) {
          Equipment.update(equipmentID, req.body, function (err, result) {
            if (result)
              return res.status(200).json({
                success: true,
                message: MESSAGE.UPDATE_SUCCESS,
                data: result,
              });
          });
        } else {
          return res
            .status(300)
            .json({ success: false, message: MESSAGE.ID_NOT_EXIST });
        }
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  };
}
module.exports = new EquipmentController();
