const express = require("express");
const bodyParser = require("body-parser");

const hostname = "0.0.0.0";
const port = process.env.PORT || 3000;

const authorsController = require("./controllers/authors")();
const booksController = require("./controllers/books")();

const app = (module.exports = express());

// logging
app.use((req, res, next) => {
	// Display log for requests
	console.log("[%s] %s -- %s", new Date(), req.method, req.url);
	next();
});

app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.json({
		hello: "World",
	});
});

// Get all books
app.get("/books", booksController.getController);
// Add a book
app.post("/books", booksController.postController);
// A book
app.get("/books/:id", booksController.getById);

//Get all authors
app.get("/authors", authorsController.getController);
// Get an author
app.post("/authors", authorsController.postController);
// An author
app.get("/authors/:id", authorsController.getById);

app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

// 404
app.use((req, res) => {
	res.status(404).json({
		error: 404,
		message: "Route not found",
	});
});
