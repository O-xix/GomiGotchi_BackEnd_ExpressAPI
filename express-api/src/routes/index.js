const express = require('express');
const ApiController = require('../controllers/index').ApiController;

const router = express.Router();
const apiController = new ApiController();

function setRoutes(app) {
    router.get('/items', apiController.getItems.bind(apiController));
    router.post('/items', apiController.createItem.bind(apiController));

    app.use('/api', router);
}

module.exports = setRoutes;