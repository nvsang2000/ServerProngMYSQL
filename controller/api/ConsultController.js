const { validationResult } = require("express-validator");

const cloudinary = require("../../middleware/cloudinary");
const Consult = require("../../models/consult");

class ConsultController {
  getAllConsult = (req, res) => {
    try {
      Consult.find(function (err, result) {
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
  getConsult = (req, res) => {
    const consultID = req.params.id;
    try {
      Consult.findById(consultID, function (err, result) {
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
  postConsult = async (req, res) => {
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
      Consult.insert(req.body, function (err, result) {
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
  deleteConsult = (req, res) => {
    const consultID = req.params.id;
    try {
      Consult.findById(consultID, function (err, result) {
        if (result) {
          Consult.deleteById(consultID, function (err, result) {
            if (result)
              return res.status(200).json({
                success: true,
                message: "Delete successfully!",
              });
            else {
              return res.status(300).json({ success: false, message: err });
            }
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
  putConsult = async (req, res) => {
    const consultID = req.params.id;
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
      Consult.findById(consultID, function (err, result) {
        if (result) {
          Consult.update(consultID, req.body, function (err, result) {
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
module.exports = new ConsultController();
