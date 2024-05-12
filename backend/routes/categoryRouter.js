const express = require('express');
const router = express.Router();

const getAllCategoriesController = require('../controller/category/getAllCategoriesController');
const getCategoryController = require('../controller/category/getCategoryController');
const createCategoryController = require('../controller/category/createCategoryController');
const updateCategoryController = require('../controller/category/updateCategoryController');
const deleteCategoryController = require('../controller/category/deleteCategoryController');

router.get('/', getAllCategoriesController);
router.get('/:id', getCategoryController);
router.post('/create', createCategoryController);
router.put('/update/:id', updateCategoryController);
router.delete('/delete/:id', deleteCategoryController);

module.exports = router;