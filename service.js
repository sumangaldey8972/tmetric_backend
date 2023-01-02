const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "hal.lubowitz55@ethereal.email",
    pass: "3QhEC7r95vGFfhTDx5",
  },
});

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "anitadey9735@gmail.com",
//     pass: "anita@9735",
//   },
// });

module.exports = transporter;
