const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");
const adminRoute = require("./routes/admin");
const userRoute = require("./routes/user");

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/admin", adminRoute);
app.use("/user", userRoute);

(async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
  } catch (err) {
    console.log("error: " + err);
  }
})();

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
