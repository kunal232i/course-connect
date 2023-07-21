const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
const cors = require("cors");
const { ADMIN, COURSE } = require("../db");
const authAdminMiddleware = require("../middleware/isAdminAuth");

app.use(cors());

const router = express.Router();

const generateJwtForAdmin = (newAdmin) => {
  const payload = { username: newAdmin.username };
  return jwt.sign(payload, process.env.ADMIN_ACCESS_TOKEN_SECRET);
};

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const adminFound = await ADMIN.findOne({ username });
  if (adminFound) {
    res.status(401).send({ message: "Admin already exists!!" });
  } else {
    const newAdmin = new ADMIN({ username, password });
    await newAdmin.save();
    const token = generateJwtForAdmin(newAdmin);
    res
      .status(201)
      .json({ message: "Admin Created Sucessfully!!", token: token });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await ADMIN.findOne({ username, password });
  if (admin) {
    const token = generateJwtForAdmin(admin);
    res.json({ message: "You logged in sucessfully!!", token: token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

router.get("/me", authAdminMiddleware, (req, res) => {
  res.send(req.admin);
});

router.post("/courses", authAdminMiddleware, async (req, res) => {
  const newCourse = new COURSE(req.body);
  await newCourse.save();
  res
    .status(201)
    .json({ message: "course created sucessfully!!", courseId: newCourse.id });
});

router.put("/courses/:courseId", authAdminMiddleware, async (req, res) => {
  const courseFound = await COURSE.findByIdAndUpdate(
    req.params.courseId,
    req.body,
    { new: true }
  );
  if (courseFound) {
    res.json({ message: "Course updated successfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

router.get("/courses", authAdminMiddleware, async (req, res) => {
  const courses = await COURSE.find({});
  res.json({ courses });
});

module.exports = router;
