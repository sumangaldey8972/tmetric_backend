const mongoose = require("mongoose");

const connect = async () => {
  return await mongoose
    .connect(
      "mongodb+srv://sumangaldey8972:sd@cluster0.ms72gek.mongodb.net/tmetric_v2"
    )
    .then(() => console.log("db connected"));
};

module.exports = connect;
