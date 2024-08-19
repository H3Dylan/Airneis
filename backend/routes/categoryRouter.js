import express from "express";
import getAllCategoriesController from "../controller/category/getAllCategoriesController.js";
import getCategoryController from "../controller/category/getCategoryController.js";
import createCategoryController from "../controller/category/createCategoryController.js";
import updateCategoryController from "../controller/category/updateCategoryController.js";
import deleteCategoryController from "../controller/category/deleteCategoryController.js";

const router = express.Router();

router.get("/", getAllCategoriesController);
router.get("/:id", getCategoryController);
router.post("/create", createCategoryController);
router.put("/update/:id", updateCategoryController);
router.delete("/delete/:id", deleteCategoryController);

export default router;
