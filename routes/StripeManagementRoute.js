const express = require('express');
const Router = express.Router();

const { PayWithStripe } = require('../controllers/StripePaymentManagementController');
Router.post('/PayWithStripe',PayWithStripe);
module.exports = Router;