const mongoose = require("mongoose");
const { faker } = require('@faker-js/faker');
const Article = require("./model/article");
const Category = require("./model/category");
require("dotenv").config();

const seedDB = async () => {
	await mongoose.connect(process.env.MONGODB_URI);
	console.log("seedDB is connected to MongoDB");
	await Article.deleteMany({});
	await Category.deleteMany({});

	const categories = [
		"Chaises",
		"Tables",
		"Canapés",
		"Lits",
		"Tabourets",
		"Fauteuils",
		"Commodes",
		"Armoires",
	];
	const categoryDocs = [];

	for (let i = 0; i < categories.length; i++) {
		const category = new Category({ name: categories[i] });
		categoryDocs.push(category);
		await category.save();
	}

	for (let category of categoryDocs) {
		for (let i = 0; i < 100; i++) {
			const article = new Article({
				category: category._id,
				name: faker.commerce.productName() || faker.commerce.product(),
				price: faker.commerce.price(),
				stock: faker.number.int({ min: 0, max: 100 }),
				shortDescription: faker.lorem.words(6),
				detailsDescription: faker.lorem.paragraph(),
				materials: faker.commerce.productMaterial().split(","),
				createdAt: faker.date.past(),
			});

			await article.save();
		}
	}

	console.log("Database seeded successfully!");
	mongoose.connection.close();
    console.log("seedDB is deconnected to MongoDB")
};

seedDB().catch((err) => {
	console.error(err);
	mongoose.connection.close();
});

module.exports = seedDB;
