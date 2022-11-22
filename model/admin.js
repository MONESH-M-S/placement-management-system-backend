const mongoose = require("mongoose");
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Please provide valid mail"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

adminSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

adminSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Admin", adminSchema);
