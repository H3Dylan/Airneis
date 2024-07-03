const express = require('express');
const router = express.Router();

const searchController = require('../controller/search/searchController');

router.get('', searchController);

module.exports = router;