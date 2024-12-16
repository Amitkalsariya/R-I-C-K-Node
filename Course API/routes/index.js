var express = require("express");
var router = express.Router();
const COURSE = require("../Models/user");
/* GET home page. */
router.get("/courses", async (req, res, next) => {
  try {
    const allc = await COURSE.find();    
    res.status(200).json({
      status: "Success To Load Data",
      data: allc
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      error: err.message,
    });
  }
});

router.post("/courses/add", async (req, res, next) => {
  try {
    console.log(req.body);

    const addcourse = await COURSE.create(req.body);
    if (
      !req.body.course_id ||
      !req.body.course_no ||
      !req.body.c_name ||
      !req.body.c_price
    ) {
      throw new Error("Please Enter All The Info.");
    }
    res.status(200).json({
      status: "Success To Add   Data",
      data: addcourse,
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed To Enter Details",
      error: err.message,
    });
  }
});

router.get("/courses/check", async (req, res, next) => {
  try {
    console.log(req.body);
    if (
      !req.body.course_id ||
      !req.body.course_no ||
      !req.body.c_name ||
      !req.body.c_price
    ) {
      throw new Error("Please Enter All The Info.");
    }

    const checkid = await COURSE.findOne({ course_id: req.body.course_id });
    if (!checkid) {
      throw new Error("Id Is Wrong");
    }

    const checkno = checkid.course_no === req.body.course_no;
    if (!checkno) {
      throw new Error("No Is Wrong");
    }

    const checkcourse = checkid.c_name === req.body.c_name;
    if (!checkcourse) {
      throw new Error("Course Name Is Wrong");
    }
    const checkprice = checkid.c_price === req.body.c_price;
    if (!checkprice) {
      throw new Error("Course Price Is Wrong");
    }

    res.status(200).json({
      status: "Success To Add Data",
      message: "Successfully Checked",
      data: checkid,
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed To Enter Details",
      error: err.message,
    });
  }
});

module.exports = router;
