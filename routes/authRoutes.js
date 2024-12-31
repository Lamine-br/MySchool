const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const user = new User({ ...req.body, password: hashedPassword });
		await user.save();
		res.status(201).json({ message: "Utilisateur créé avec succès" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res
				.status(400)
				.json({ message: "Email ou mot de passe incorrect." });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res
				.status(400)
				.json({ message: "Email ou mot de passe incorrect." });

		const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1h" });
		res.json({ token });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.get("/me", async (req, res) => {
	try {
		const token = req.header("Authorization");
		if (!token) return res.status(401).json({ message: "Non autorisé" });

		const verified = jwt.verify(token, "SECRET_KEY");
		const user = await User.findById(verified.id).select("-password");
		if (!user)
			return res.status(404).json({ message: "Utilisateur introuvable" });

		res.json(user);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
