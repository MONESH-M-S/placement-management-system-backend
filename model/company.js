const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    company_name: {
      type: String,
      required: true,
      unquie: true,
      lowercase: true,
    },
    company_type: {
      type: String,
      required: true,
      enum: ["core", "software"],
      lowercase: true,
    },
    alumni_detail: [
      {
        name: {
          type: String,
        },
        phone: {
          type: String,
        },
        batch: {
          type: Number,
        },
        email: {
          type: String,
        },
      },
    ],
    company_description: {
      type: String,
      required: true,
    },
    company_logo: {
      type: String,
      required: true,
    },
    cloudinary_id: {
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
