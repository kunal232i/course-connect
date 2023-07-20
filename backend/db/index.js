const mongoose = require("mongoose");
require("dotenv").config();

const AdminSchema = mongoose.Schema({
  username: String,
  password: String,
});

const UserSchema = mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "COURSE" }],
});

const CourseSchema = mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  published: Boolean,
});

const ADMIN = mongoose.model("ADMIN", AdminSchema);
const USER = mongoose.model("USER", UserSchema);
const COURSE = mongoose.model("COURSE", CourseSchema);

module.exports = {
  ADMIN,
  USER,
  COURSE,
};
