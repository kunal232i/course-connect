const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");
const { USER, COURSE } = require("../db");
const authUserMiddleware = require("../middleware/isUserAuth");

app.use(cors());

const router = express.Router();

const generateJwtForUser = (user) => {
  const payload = { username: user.username };
  return jwt.sign(payload, process.env.USER_ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const userFound = await USER.findOne({ username });
  if (userFound) {
    res.status(401).send({ message: "User already exists!!" });
  } else {
    const newUser = new USER({ username, password });
    await newUser.save();
    const token = generateJwtForUser(newUser);
    res
      .status(201)
      .json({ message: "new user created sucessfully!!", token: token });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await USER.findOne({ username, password });

  if (user) {
    const token = generateJwtForUser(user);
    res.json({ message: "user logged in sucessfully!!", token: token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

router.get("/courses", authUserMiddleware, async (req, res) => {
  const courses = await COURSE.find({ published: true });
  res.status(202).json({ courses });
});

router.post("/courses/:courseId", authUserMiddleware, async (req, res) => {
  const courseId = req.params.courseId;
  const courseFound = await COURSE.findById(courseId);
  if (courseFound) {
    const user = await USER.findOne({ username: req.user.username });
    if (user) {
      if (!user.purchasedCourses) {
        user.purchasedCourses = [];
      }
      user.purchasedCourses.push(courseId);
      await user.save();
      res.json({ message: "course purchased sucessfully", id: courseId });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(403).json({ message: "course not found" });
  }
});

router.get("/purchasedCourses", authUserMiddleware, async (req, res) => {
  const user = await USER.findOne({ username: req.user.username }).populate(
    "purchasedCourses"
  );
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: "user not found" });
  }
});

module.exports = router;
