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
const companyRoutes = require("./routes/companies");
const adminRoutes = require("./routes/admins");

app.use(`api/v1/auth`, authRoutes);
app.use(`api/v1/company`, companyRoutes);
app.use(`api/v1/admin`, adminRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is ready!`);
});
