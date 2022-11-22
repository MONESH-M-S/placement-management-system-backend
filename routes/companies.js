const express = require("express");
const Company = require("../model/company");

const router = express.Router();

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
          message: "No companies found!",
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
          message: "No companies found!",
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

router.post("/", (req, res) => {
  const company = new Company({
    company_name: req.body.company_name,
    company_type: req.body.company_type,
    company_description: req.body.company_description,
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

module.exports = router;
