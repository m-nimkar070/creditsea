const express = require('express');
const multer = require('multer');
const creditController = require('../controllers/creditController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// File upload route
router.post('/upload', upload.single('xmlFile'), creditController.uploadFile);

// Fetch report route
router.get('/report', creditController.getReport);

module.exports = router;