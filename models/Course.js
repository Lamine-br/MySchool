const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: String,
	format: { type: String, enum: ["video", "document", "real-time"] },
	content: String,
	createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Course", courseSchema);
