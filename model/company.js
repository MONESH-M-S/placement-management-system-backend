const mongoose = require("mongoose");

const alumniSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
  },
});

const companySchema = new mongoose.Schema(
  {
    company_name: {
      type: String,
      required: true,
      unquie: true,
    },
    company_type: {
      type: String,
      required: true,
      enum: ["core", "software"],
    },
    alumni: [alumniSchema],
    company_description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

companySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

companySchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Company", companySchema);
