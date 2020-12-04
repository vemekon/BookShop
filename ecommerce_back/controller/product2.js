const formidable = require("formidable");

exports.create = (req, res) => {
	const form = formidable({ multiples: true });
	console.log("here");

	form.parse(req, (err, fields, files) => {
		if (err) {
			return res.status(400).send("geyga");
		}
		res.json({ fields, files });
	});
};
