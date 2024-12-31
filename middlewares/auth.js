const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const token = req.header("Authorization");
	if (!token)
		return res.status(401).json({ message: "Accès refusé, token manquant." });

	try {
		const verified = jwt.verify(token, "SECRET_KEY");
		req.user = verified;
		next();
	} catch (err) {
		res.status(400).json({ message: "Token invalide." });
	}
};
