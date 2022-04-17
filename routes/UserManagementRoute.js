//Depnedemcies and Initialization
const express = require('express');
const Router = express.Router();
//Depnedemcies and Initialization


//Start Block Accessing The Library Files And Routes
const { 
    UserLogin,
    UserRegister,
    GetAllUser,
    DeleteUserById,
    ActiveUserStatusById,
    DeactivateUserStatusById,
    GetUserInformationById,
    GetUserWithQuestionnaireInformation
} = require('../controllers/UserManagementController')
//End Block Accessing The Library Files And Routes


//Start Block For Accessing The Controlers
Router.post('/UserLogin',UserLogin);
Router.post('/UserRegister',UserRegister);
Router.get('/GetAllUser',GetAllUser);
Router.delete('/DeleteUserById/:_UserId',DeleteUserById);
Router.post('/ActiveUserStatusById/:_UserId',ActiveUserStatusById);
Router.post('/DeactivateUserStatusById/:_UserId',DeactivateUserStatusById);
Router.get('/GetUserInformationById/:_UserId',GetUserInformationById);
Router.get('/GetUserWithQuestionnaireInformation/:_UserId',GetUserWithQuestionnaireInformation);
//End Block For Accessing The Controlers


module.exports = Router;