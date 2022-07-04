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
  login = async (req, res) => {};
  register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (user)
        return res
          .status(300)
          .json({ success: false, message: "Email already exists" });

      const salt = await bcrypt.genSalt(10);
      const hasPassword = await bcrypt.hash(password, salt);
      const newUser = new User({ name, email, password: hasPassword });
      await newUser.save();

      const accessToken = jwt.sign(
        { user_id: newUser._id },
        process.env.ACCESS_TOKEN
      );
      res
        .cookie("access_token", accessToken, {
          maxAge: 900000,
          httpOnly: true,
        })
        .status(200)
        .json({
          success: true,
          message: "Created successfully",
          token: accessToken,
          data: newUser,
        });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server error" });
    }
  };
}

module.exports = new AuthController();
