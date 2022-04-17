const express = require('express');
const Router = express.Router();

const {
    PlaceOrder,
    GetAllOrder
} = require('../controllers/OrderManagementController');

Router.post('/PlaceOrder',PlaceOrder);
Router.get('/GetAllOrder',GetAllOrder);

module.exports = Router;