const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

require("dotenv/config");

app.use(cors());
app.options("*", cors());

app.use(express.json());

app.use(morgan("tiny"));

app.use("/image", express.static(__dirname + "/image"));

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

const authRoutes = require("./routes/auth");
// const userRoutes = require("./routes/users");
// const activityRoutes = require("./routes/activites");
// const availableMentorsRoute = require("./routes/available-mentors");
// const markRoute = require("./routes/marks");

app.use(`/auth`, authRoutes);
// app.use(`/user`, userRoutes);
// app.use(`/activity`, activityRoutes);
// app.use(`/available-mentors`, availableMentorsRoute);
// app.use(`/mark`, markRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is ready!`);
});