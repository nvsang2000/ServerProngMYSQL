const { json } = require("express");
const { validationResult } = require("express-validator");

const cloudinary = require("../middleware/cloudinary");
const Consult = require("../models/consult");

class ApiController {
  getAllConsult = async (req, res) => {
    try {
      await Consult.find(function (result) {
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
  getConsult = async (req, res) => {
    const consultID = req.params.id;
    try {
      Consult.findById(consultID, function (result) {
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
      await Consult.insert(req.body, function (result) {
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
  deleteConsult = async(req, res) => {
    const consultID = req.params.id;
    try {
      await Consult.findById(consultID, function (result) {
        if (result != null) {
          Consult.deleteById(consultID, function (err, data) {
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
  putConsult = async(req, res) => {
    const consultID = req.params.id;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        upload_preset: "upload_avata",
      });
      req.body.url_image = result.url;
    }
    try {
      await Consult.findById(consultID, function (result) {
        if (result != null) {
          Consult.update(consultID, req.body, function (result) {
            if (result)
              return res.status(200).json({
                success: true,
                message: "Update successfully!",
                data: result
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
  }
}
module.exports = new ApiController();
