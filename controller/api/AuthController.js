var { validationResult } = require("express-validator");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var Auth = require("../../models/auth");
var { MESSAGE } = require("../../constant/index");

class AuthController {
  getAuth = (req, res) => {
    try {
      Auth.find(function (err, result) {
        if (result)
          return res.status(200).json({ success: true, data: result });
        else {
          return res
            .status(300)
            .json({ success: false, message: MESSAGE.GET_NULL });
        }
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: MESSAGE.SERVER_ERR });
    }
  };
  login = (req, res) => {
    const { email, password } = req.body;
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
      Auth.findById(email, async function (err, result) {
        if (result) {
          const passwordValid =await bcrypt.compare(
            password,
            result[0].password
          );
          if (!passwordValid)
            return res.status(300).json({success: false,message: MESSAGE.PASS_EXIT});

          const accessToken = jwt.sign(
            { user_id: result.id },
            process.env.ACCESS_TOKEN
          );
          return res.status(200).json({
            success: true,
            token: accessToken,
          });
        } else {
          return res.status(300).json({
            success: false,
            message: MESSAGE.EMAIL_NOT_EXIST,
          });
        }
      }); 
    } catch (error) {
      return res.status(500).json({ success: false, message: MESSAGE.SERVER_ERR });
    }
  };
  register = (req, res) => {
    const { name, email, password } = req.body;
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
      Auth.findById(email, async function (err, result) {
        if (result === null ) {
          const salt = await bcrypt.genSalt(10);
          const hasPassword = await bcrypt.hash(password, salt);
          req.body.password = hasPassword;
          Auth.insert(req.body, function (err, result) {
            if (result) {
              const accessToken = jwt.sign(
                { user_id: result.id },
                process.env.ACCESS_TOKEN
              );
              return res
                .cookie("access_token", accessToken, {
                  maxAge: 900000,
                  httpOnly: true,
                })
                .status(200)
                .json({ success: true, token: accessToken });
            } else {
              return res.status(300).json({ success: false, message: err });
            }
          });
        } else {
          return res
            .status(300)
            .json({ success: false, message: MESSAGE.EMAIL_IS_REGISTER });
        }
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: MESSAGE.SERVER_ERR});
    }
  };
}

module.exports = new AuthController();
