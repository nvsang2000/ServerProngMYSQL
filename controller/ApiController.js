
const Consult = require('../models/consult');

class ApiController {
  getAllConsult = async (req, res) => {
    try {
       Consult.find(function (err, data) {
         if (err)
           return res
             .status(300)
             .json({ success: false, message: "Get failed." });
         if (data) {
           return res.status(200).json({
             success: true,
             data: data,
           });
         }
       });
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  };
  getConsult = async (req, res) => {
    const consultID = req.params.id;
    console.log(consultID);
    try {
      Consult.findById(consultID , function (err, data) {
        if (err)
          return res
            .status(300)
            .json({ success: false, message: "Get failed." });
        if (data) {
          return res.status(200).json({
            success: true,
            data: data,
          });
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  };
  postConsult = async( req, res ) => {
    const { id, name, url_image, place } = req.body;
    console.log(req.body);
  }
}
module.exports = new ApiController()