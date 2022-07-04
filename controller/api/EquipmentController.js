const { validationResult } = require("express-validator");

const cloudinary = require("../../middleware/cloudinary");
const Equipment = require("../../models/equipment");

class EquipmentController {
  getAllEquipment = async (req, res) => {
    try {
      await Equipment.find(function (result) {
        if (result != null)
          return res.status(200).json({ success: true, data: result });
        else {
          return res.status(300).json({ success: false, message: "Get null!" });
        }
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  };
  getEquipment = async (req, res) => {
    const equipmentID = req.params.id;
    try {
      Equipment.findById(equipmentID, function (result) {
        if (result != null)
          return res.status(200).json({ success: true, data: result });
        else {
          return res
            .status(300)
            .json({ success: false, message: "ID does not exist!" });
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
      await Equipment.insert(req.body, function (result) {
        if (result != null)
          return res.status(200).json({ success: true, data: result });
        else {
          return res
            .status(300)
            .json({ success: false, message: "Add failed" });
        }
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  };
  deleteEquipment = async (req, res) => {
    const equipmentID = req.params.id;
    try {
      await Equipment.findById(equipmentID, function (result) {
        if (result != null) {
          Equipment.deleteById(equipmentID, function (err, data) {
            if (data)
              return res.status(200).json({
                success: true,
                message: "Delete successfully!",
              });
          });
        } else {
          return res
            .status(300)
            .json({ success: false, message: "ID does not exist!" });
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
      await Equipment.findById(equipmentID, function (result) {
        if (result != null) {
          Equipment.update(equipmentID, req.body, function (result) {
            if (result)
              return res.status(200).json({
                success: true,
                message: "Update successfully!",
                data: result,
              });
          });
        } else {
          return res
            .status(300)
            .json({ success: false, message: "ID does not exist!" });
        }
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  };
}
module.exports = new EquipmentController();
