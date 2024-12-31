const express = require("express");
const { getAllCourses, addCourse } = require("../controllers/courseController");

const router = express.Router();

router.get("/", getAllCourses);
router.post("/", addCourse);

module.exports = router;
