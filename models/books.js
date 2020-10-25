const db = require("../db")();
const COLLECTION = "books";

module.exports = () => {
	const get = async (id = null) => {
		console.log("    insede books model");
		if (!id) {
			const books = await db.get(COLLECTION);
			return books;
		}

		const books = await db.get(COLLECTION, { id });
		return books;
	};

	const add = async (name, author) => {
		const bookCount = await db.count(COLLECTION);
		const result = await db.add(COLLECTION, {
			id: bookCount + 1,
			name: name,
			author: author,
		});

		return result.result;
	};

	return {
		get,
		add,
	};
};
