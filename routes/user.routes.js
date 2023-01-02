const express = require("express");
const {
  loginUser,
  createUser,
  forgetPassword,
  verifyOtp,
  resetPassword,
} = require("../controller/users.controller");
const app = express.Router();

app.post("/signup", createUser);
app.post("/login", loginUser);
app.post("/forgetpassword", forgetPassword);
app.post("/otpverify/:token", verifyOtp);
app.post("/resetpassword/:token", resetPassword);
module.exports = app;
