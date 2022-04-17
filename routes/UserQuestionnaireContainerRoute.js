//Depnedemcies and Initialization
const express = require('express');
const Router = express.Router();
//Depnedemcies and Initialization

//Start Block Accessing The Library Files And Routes
const { 
    UpdateUserQuestionnaireContainerByQuestions,
    AddUserQuestionnaireResult,
    GetFinalResult
 } = require('../controllers/UserQuestionnaireContainerController');
//End Block Accessing The Library Files And Routes


//Start Block For Accessing The Controlers
Router.post('/UpdateQuestions',UpdateUserQuestionnaireContainerByQuestions);
Router.post('/AddUserQuestionnaireResult',AddUserQuestionnaireResult);
Router.get('/GetFinalResult/:_UserId',GetFinalResult);
//End Block For Accessing The Controlers


module.exports = Router;