const User = require("../models/User");

exports.register = async (req, res) => {
	try {
		const user = new User(req.body);
		await user.save();
		res.status(201).json({ message: "Utilisateur enregistré", user });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email, password });
		if (!user) {
			return res.status(404).json({ message: "Utilisateur introuvable" });
		}
		res.status(200).json({ message: "Connexion réussie", user });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
