const db = require('../db/connectDB')

class ApiController {
  getAllConsult = async (req, res) => {
    var sqlString = "SELECT * FROM consult";
    try {
      db.query(sqlString, function (error, results, fields) {
        if (error)
          throw res
            .status(300)
            .json({ success: false, message: "Get failed." });
        return res.status(200).json({
          success: true,
          data: results,
          message: "Get all consult.",
        });
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  };
  getConsult = async (req, res) => {
    const consultID = req.params.id;
    console.log(consultID);
    var sqlString = "SELECT * FROM consult WHERE id = " + consultID;
    try {
      db.query(sqlString, function (error, results, fields) {
        if (error)
          throw res
            .status(300)
            .json({ success: false, message: "Get failed." });
        return res.status(200).json({
          success: true,
          data: results,
          message: "Get consult.",
        });
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