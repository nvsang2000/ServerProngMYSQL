const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Auth = require("../../models/auth");

class AuthController {
  getAuth = async (req, res) => {
    try {
      await Auth.find(function (result) {
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
  login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(303)
        .json({ success: false, message: "Missing email or password" });
    try {
      const user = await Auth.findById({ email });
      if (!user)
        return res
          .status(300)
          .json({ success: false, message: "Email already exists" });
      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid)
        return res
          .status(300)
          .json({ success: false, message: "Password already exists" });

      const accessToken = jwt.sign(
        { user_id: user._id },
        process.env.ACCESS_TOKEN
      );

      res.status(200).json({
        success: true,
        message: "login successfully",
        token: accessToken,
        data: user,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: "server error" });
    }
  };
  register = async (req, res) => {
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
      await Auth.findById(email, async function (result) {
        if (result === null) {
          const salt = await bcrypt.genSalt(10);
          const hasPassword = await bcrypt.hash(password, salt);
          req.body.password = hasPassword;
          await Auth.insert(req.body, function (result) {
            if (result != null) {
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
              return res
                .status(300)
                .json({ success: false, message: "Add failed" });
            }
          });
        } else {
          return res
            .status(300)
            .json({ success: false, message: "This email is registered!" });
        }
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server error" });
    }
  };
}

module.exports = new AuthController();
