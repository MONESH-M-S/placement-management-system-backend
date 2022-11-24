const express = require("express");
const Admin = require("../model/admin");

const router = express.Router();

router.delete("/:id", (req, res) => {
  Admin.findByIdAndDelete(req.params.id)
    .then((admin) => {
      if (admin._id != undefined) {
        return res
          .json({
            success: true,
            message: "Admin deleted successfully!",
          })
          .status(200);
      } else {
        return res
          .json({
            success: false,
            message: "Admin not deleted!",
          })
          .status(400);
      }
    })
    .catch((err) => {
      console.log(err);
      return res
        .json({
          success: false,
          message: "Internal Server error, Try again later!",
        })
        .status(500);
    });
});
module.exports = router;
