import mongoose from "mongoose";

const Schema = mongoose.Schema;

const articleSchema = new Schema({
	category: {
		type: Schema.Types.ObjectId,
		ref: "category",
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	stock: {
		type: Number,
		required: true,
	},
	shortDescription: {
		type: String,
		required: true,
	},
	detailsDescription: {
		type: String,
		required: true,
	},
	materials: {
		type: [String],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Article = mongoose.model("article", articleSchema);

export default Article;
