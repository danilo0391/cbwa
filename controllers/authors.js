const authors = require("../models/authors")();

module.exports = () => {
	const getController = (req, res) => {
		res.setHeader("Content-type", "application/json");
		return res.json(authors.get());
	};

	const getById = (req, res) => {
		res.setHeader("Content-Type", "application/json");
		const result = authors.get(req.params.id);
		if (result.error) {
			return res.status(404).json({
				error: "Invalid ID",
			});
		}

		res.json(authors.get(req.params.id));
	};

	const postController = (req, res) => {
		const name = req.body.name;
		authors.add(name);
		return res.end(`POST: ${name}`);
	};

	return {
		getController,
		postController,
		getById,
	};
};
