const express = require('express');
const router = express.Router();

const getAllArticlesController = require('../controller/article/getAllArticlesController');
const getArticleController = require('../controller/article/getArticleController');
const createArticleController = require('../controller/article/createArticleController');
const updateArticleController = require('../controller/article/updateArticleController');
const deleteArticleController = require('../controller/article/deleteArticleController');
const getArticlesByCategoryController = require('../controller/article/getArticlesByCategoryController');
const getSimilarArticlesController = require('../controller/article/getSimilarArticlesController');

router.get('/', getAllArticlesController);
router.get('/:id', getArticleController);
router.post('/create', createArticleController);
router.put('/update/:id', updateArticleController);
router.delete('/delete/:id', deleteArticleController);
router.get('/category/:category', getArticlesByCategoryController);
router.get('/similar/:category/:id', getSimilarArticlesController);

module.exports = router;