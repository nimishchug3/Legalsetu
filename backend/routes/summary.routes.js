const express = require('express');
const multer = require('multer');
const { summaryController } = require('../controllers/summary.controller.js');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), summaryController);

module.exports = router;
