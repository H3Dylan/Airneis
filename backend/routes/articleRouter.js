import express from "express";
import getAllArticlesController from "../controller/article/getAllArticlesController.js";
import getArticleController from "../controller/article/getArticleController.js";
import createArticleController from "../controller/article/createArticleController.js";
import updateArticleController from "../controller/article/updateArticleController.js";
import deleteArticleController from "../controller/article/deleteArticleController.js";
import getArticlesByCategoryController from "../controller/article/getArticlesByCategoryController.js";
import getSimilarArticlesController from "../controller/article/getSimilarArticlesController.js";

const router = express.Router();

router.get("/", getAllArticlesController);
router.get("/:id", getArticleController);
router.post("/create", createArticleController);
router.put("/update/:id", updateArticleController);
router.delete("/delete/:id", deleteArticleController);
router.get("/category/:category", getArticlesByCategoryController);
router.get("/similar/:category/:id", getSimilarArticlesController);

export default router;