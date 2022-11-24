const express = require("express");
const multer = require("multer");
const Company = require("../model/company");

const router = express.Router();

const storageConfing = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "image");
  },
  filename: (req, file, cb) => {
    const filename =
      Date.now() + "-" + file.originalname.toLowerCase().split(" ").join("-");
    cb(null, filename);
  },
});

const upload = multer({ storage: storageConfing });

router.get("/", (req, res) => {
  Company.find({})
    .then((companies) => {
      if (companies.length > 0) {
        return res
          .json({
            companies: companies,
            message: "Companies Fetched Successfully!",
          })
          .status(200);
      }
      return res
        .json({
          companies: [],
          message: "No companies available!",
        })
        .status(200);
    })
    .catch((err) => {
      console.log(err);
      return res
        .json({
          companies: null,
          message: "Internal server error, Try again later",
        })
        .status(200);
    });
});

router.get("/:type", (req, res) => {
  Company.find({ type: req.params.type })
    .then((companies) => {
      if (companies.length > 0) {
        return res
          .json({
            companies: companies,
            message: "Companies Fetched Successfully!",
          })
          .status(200);
      }
      return res
        .json({
          companies: [],
          message: `No companies available with type '${req.params.type}'`,
        })
        .status(200);
    })
    .catch((err) => {
      console.log(err);
      return res
        .json({
          companies: null,
          message: "Internal server error, Try again later",
        })
        .status(200);
    });
});

router.post("/", upload.single("company_logo"), async (req, res) => {
  const url = "http://" + req.get("host");

  const company = new Company({
    company_name: req.body.company_name,
    company_type: req.body.company_type,
    company_description: req.body.company_description,
    alumni_detail: req.body.alumni,
    company_logo: url + "/image/" + req.file.filename
  });

  company
    .save()
    .then((company) => {
      if (company._id) {
        return res
          .json({ company: company, message: "Company Added Successfully!" })
          .status(200);
      }
      return res
        .json({ company: null, message: "Company Adding Failed!" })
        .status(400);
    })
    .catch((err) => {
      console.log(err);
      return res
        .json({
          company: null,
          message: "Internal server error, Try again latter",
        })
        .status(500);
    });
});

router.put("/:id", (req, res) => {
  Company.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { alumni_detail: req.body.alumni } },
    { new: true }
  )
    .then((company) => {
      if (company._id) {
        return res
          .json({ company: company, message: "Alumni Updated Successfully!" })
          .status(200);
      }
      return res
        .json({ company: null, message: "Updating Alumni Failed!" })
        .status(400);
    })
    .catch((err) => {
      console.log(err);
      return res
        .json({
          company: null,
          message: "Internal server error, Try again latter",
        })
        .status(500);
    });
});

router.delete("/:id", (req, res) => {
  Company.findByIdAndDelete(req.params.id)
    .then((company) => {
      if (company._id !== undefined) {
        return res
          .json({
            success: true,
            company: company,
            message: "Company deleted successfully!",
          })
          .status(200);
      } else {
        return res
          .json({
            success: false,
            company: null,
            message: "Company not deleted!",
          })
          .status(400);
      }
    })
    .catch((err) => {
      console.log(err);
      return res
        .json({
          success: false,
          company: null,
          message: "Internal Server error, Try again later!",
        })
        .status(500);
    });
});

module.exports = router;
