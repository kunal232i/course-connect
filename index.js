const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const adminRoute = require("./routes/admin");
const userRoute = require("./routes/user");

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

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
