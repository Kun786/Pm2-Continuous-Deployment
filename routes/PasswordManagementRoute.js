//Dependencies
const express = require('express');
const Router = express.Router();
//Dependencies

//Calling Controllers
const {
    ForgetPasswordRequest, 
    ForgetPasswordResponse, 
    ValidateUserForTokken
} = require('../controllers/PasswordManagementController');
//Calling Controllers

//Joining Routes to Controllers Via Http
Router.post('/ForgotPasswordMechanism',ForgetPasswordRequest);
Router.post('/ForgetPasswordResponse/:_UserId/:_Token',ForgetPasswordResponse);
Router.post('/ValidatePasswordToken',ValidateUserForTokken);
//Joining Routes to Controllers Via Http

module.exports = Router;