const { validationResult } = require("express-validator");

const cloudinary = require("../../middleware/cloudinary");
const Magazine = require("../../models/magazine");

class MagazineController {
  getAllMagazine = (req, res) => {
    try {
      Magazine.find(function (err, result) {
        if (result)
          return res.status(200).json({ success: true, data: result });
        else {
          return res.status(300).json({ success: false, message: "Get null!" });
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
            .status(300)
            .json({ success: false, message: "ID does not exist!" });
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
      return res.status(500).json({ success: false, message: message });
    }
    console.log("data: ", req.body);
    try {
      Magazine.insert(req.body, function (err, result) {
        if (result)
          return res.status(200).json({ success: true, data: result });
        else {
          return res
            .status(300)
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
      return res.status(500).json({ success: false, message: message });
    }
    try {
      Magazine.findById(MagazineID, function (err, result) {
        if (result) {
          Magazine.update(MagazineID, req.body, function (err, result) {
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
module.exports = new MagazineController();
