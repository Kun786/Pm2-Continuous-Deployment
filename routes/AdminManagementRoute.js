//Depnedemcies and Initialization
const express = require('express');
const Router = express.Router();
//Depnedemcies and Initialization


//Start Block Accessing The Library Files And Routes
const { AdminRegister, AdminLogin, GetAdminDetails } = require('../controllers/AdminManagementController');
//End Block Accessing The Library Files And Routes


//Start Block For Accessing The Controlers
Router.post('/AdminLogin',AdminLogin);
Router.post('/AdminRegister',AdminRegister);
Router.get('/GetAdminDetails',GetAdminDetails);
//End Block For Accessing The Controlers


module.exports = Router;