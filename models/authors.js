const db = require("../db")();
const COLLECTION = "authors";

module.exports = () => {
	const get = async (id = null) => {
		console.log("    insede authors model");
		if (!id) {
			const authors = await db.get(COLLECTION);
			return authors;
		}

		const authors = await db.get(COLLECTION, { id });
		return authors;
	};

	const add = async (name) => {
		const authorCount = await db.count(COLLECTION);
		const result = await db.add(COLLECTION, {
			id: authorCount + 1,
			name: name,
		});
		return result.result;
	};

	return {
		get,
		add,
	};
};
