var { validationResult } = require("express-validator");
var cloudinary = require("../../middleware/cloudinary");
var Magazine = require("../../models/magazine");
var { MESSAGE } = require("../../constant/index")

class MagazineController {
  getAllMagazine = (req, res) => {
    try {
      Magazine.find(function (err, result) {
        if (result)
          return res.status(200).json({ success: true, data: result });
        else {
          return res.status(400).json({ success: false, message: MESSAGE.GET_NULL });
        }
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  };
  getMagazine = (req, res) => {
    const MagazineID = req.params.id;
    try {
      Magazine.findById(MagazineID, function (err, result) {
        if (result)
          return res.status(200).json({ success: true, data: result });
        else {
          return res
            .status(400)
            .json({ success: false, message: MESSAGE.ID_NOT_EXIST });
        }
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  };
  postMagazine = async (req, res) => {
    var errors = validationResult(req);
    var arrayError = errors.array();
    if (arrayError.length > 0) {
      var message = [];
      arrayError.forEach((element) => {
        message.push(element.msg);
      });
      return res.status(400).json({ success: false, message: message });
    }
    console.log("data: ", req.body);
    try {
      Magazine.insert(req.body, function (err, result) {
        if (result)
          return res.status(200).json({ success: true, data: result });
        else {
          return res
            .status(400)
            .json({ success: false, message: err });
        }
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  };
  deleteMagazine = (req, res) => {
    const MagazineID = req.params.id;
    try {
      Magazine.findById(MagazineID, function (err, result) {
        if (result) {
          Magazine.deleteById(MagazineID, function (err, result) {
            if (result)
              return res.status(200).json({
                success: true,
                message: MESSAGE.DELETE_SUCCESS,
              });
          });
        } else {
          return res
            .status(400)
            .json({ success: false, message: MESSAGE.ID_NOT_EXIST });
        }
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  };
  putMagazine = async (req, res) => {
    const MagazineID = req.params.id;
    console.log("id: ", MagazineID);
    var errors = validationResult(req);
    var arrayError = errors.array();
    if (arrayError.length > 0) {
      var message = [];
      arrayError.forEach((element) => {
        message.push(element.msg);
      });
      return res.status(400).json({ success: false, message: message });
    }
    try {
      Magazine.findById(MagazineID, function (err, result) {
        if (result) {
          Magazine.update(MagazineID, req.body, function (err, result) {
            if (result)
              return res.status(200).json({
                success: true,
                message: MESSAGE.UPDATE_SUCCESS,
                data: result,
              });
          });
        } else {
          return res
            .status(400)
            .json({ success: false, message: MESSAGE.ID_NOT_EXIST });
        }
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  };
}
module.exports = new MagazineController();
