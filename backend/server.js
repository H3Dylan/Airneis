import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRouter.js";
import articleRouter from "./routes/articleRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import orderRouter from "./routes/orderRouter.js";
import searchRouter from "./routes/searchRouter.js";
import userRouter from "./routes/userRouter.js";
import stripeRouter from "./routes/stripeRouter.js";
import bodyParser from "body-parser";

const app = express();
const PORT = 5050;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/auth", authRouter);
app.use("/api/articles", articleRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/orders", orderRouter);
app.use("/api/search", searchRouter);
app.use("/api/users/", userRouter);
app.use("/api/payment/", stripeRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	connectDB();
});
