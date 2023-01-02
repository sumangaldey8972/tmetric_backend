const jwt = require("jsonwebtoken");
const userModel = require("../models/user.models");
const optModel = require("../models/otp.models");
const transporter = require("../service");

const createUser = async (req, res) => {
  let { email, password } = req.body;
  try {
    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.status(401).send({ message: "email already exists" });
    } else {
      if (password.length < 6) {
        res
          .status(401)
          .send({ message: "password should have more than 6 charecters" });
      } else {
        let newUser = await userModel.create(req.body);
        transporter.sendMail({
          to: email,
          from: "anitadey9735@gmail.com",
          subject: "sign up confirmation",
          text: `hello ${newUser.name}, you have successfully signed up, welcome to tmetric`,
        });
        res.status(200).send({ message: "signup successfull", data: newUser });
      }
    }
  } catch (err) {
    res.status(500).send({ message: "server error while signup" });
  }
};
const loginUser = async (req, res) => {
  let { email, password } = req.body;
  try {
    let isUser = await userModel.findOne({ email });
    if (!isUser) {
      return res.status(401).send({ message: "invalid email" });
    } else if (isUser.password != password) {
      return res.status(401).send({ message: "invalid password" });
    } else {
      const token = jwt.sign(
        {
          id: isUser._id,
          email: isUser.email,
        },
        "SECRET!@#$",
        {
          expiresIn: "20 min",
        }
      );
      transporter.sendMail({
        to: email,
        from: "anitadey9735@gmail.com",
        subject: "login confirmation",
        text: `hello ${isUser.name}, you are just logged in, charge against your time`,
      });
      return res.status(200).send({ message: "login successfull", token });
    }
  } catch (err) {
    return res.status(500).send({ message: "server error while login" });
  }
};

const forgetPassword = async (req, res) => {
  let { email } = req.body;
  try {
    let checkUser = await userModel.findOne({ email });
    console.log(checkUser);
    if (!checkUser) {
      return res
        .status(401)
        .send({ message: "please provide the correct email" });
    } else {
      const otp = Math.floor(Math.random() * 10000);

      transporter.sendMail({
        to: email,
        from: "anitadey9735@gmail.com",
        subject: "otp",
        text: `hello ${email},your otp is ${otp}`,
      });
      let newOtp = await optModel.create({ otp: otp });
      return res.send(newOtp);
    }
  } catch (err) {
    return res
      .status(500)
      .send({ message: "server error while forgetting password" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    let { token } = req.params;
    let { otp } = req.body;
    let verifyToken = jwt.verify(token, "SECRET!@#$");
    console.log("verify", verifyToken);
    if (!verifyToken) {
      return res.status(400).send({ message: "token expired" });
    } else {
      let user = await userModel.findById({ _id: verifyToken.id });
      if (!user) {
        return res
          .status(400)
          .send({ message: "no user found with the provieded id" });
      } else {
        let checkOtp = await optModel.findOne({ otp });
        if (!checkOtp) {
          return res.status(400).send({ message: "otp does not match" });
        } else {
          await optModel.deleteOne({ otp: otp });
          return res.status(200).send({
            message: "otp mathced , redirecting to reset password page",
          });
        }
      }
    }
  } catch (err) {
    return res
      .status(500)
      .send({ message: "server error while otp verify link" });
  }
};

const resetPassword = async (req, res) => {
  try {
    let { token } = req.params;
    let { password } = req.body;
    let isToken = jwt.verify(token, "SECRET!@#$");
    let user = await userModel.findOne({ email: isToken.email });
    console.log("user", user);
    if (!user) {
      return res.status(400).send({ message: "token expired" });
    } else {
      let updateUser = await userModel.updateOne(
        { email: isToken.email },
        { $set: { password: password } }
      );
      // user.password = password;
      // await user.save();
      return res
        .status(200)
        .send({ message: "password reset", user: updateUser });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ message: "server error while resetting password" });
  }
};

module.exports = {
  createUser,
  loginUser,
  forgetPassword,
  verifyOtp,
  resetPassword,
};
