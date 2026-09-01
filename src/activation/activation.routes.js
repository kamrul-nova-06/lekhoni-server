const express = require('express');
const controller = require('./activation.controller');

const router = express.Router();

router.post('/activate', controller.activate);

module.exports = router;
