const Course = require("../models/Course");

exports.getAllCourses = async (req, res) => {
	try {
		const courses = await Course.find();
		res.status(200).json(courses);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.addCourse = async (req, res) => {
	try {
		const course = new Course(req.body);
		await course.save();
		res.status(201).json({ message: "Cours ajouté", course });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
