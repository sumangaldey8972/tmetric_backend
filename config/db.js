const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://sd:sd@cluster0.gkzr6fg.mongodb.net/tm"
  );
};

module.exports = connect;
