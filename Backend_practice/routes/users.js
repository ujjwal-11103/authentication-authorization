const mongoose = require('mongoose')
const plm = require("passport-local-mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/backend_practice")

const userData = mongoose.Schema({
  usernme: String,
  password: String,
  secret: String
});


userData.plugin(plm);
module.exports = mongoose.model("Users", userData)