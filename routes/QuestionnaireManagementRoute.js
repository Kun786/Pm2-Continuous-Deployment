//Depnedemcies and Initialization
const express = require('express');
const Router = express.Router();
//Depnedemcies and Initialization


//Start Block Accessing The Library Files
//End Block Accessing The Library Files


//Start Block For Accessing The Controlers
const { 
    CreateQuestionnaire,
    GetAllQuestionnaires,
    DeleteFullQuestionnaire,
    GetQuestionnaireById,
    GetQuestionnaireByName,
    AddSubCategory,
    GetSubCategory,
    MapSubCategoryAndTopic,
    GetALlMappedValues,
    DeleteCategoryByName
 } = require('../controllers/QuestionnaireManagementController');
//End Block For Accessing The Controlers


//Start Block For Joining Controllers to your Routes
Router.post('/CreateQuestionnaire',CreateQuestionnaire);
Router.get('/GetSubCategory',GetSubCategory);
Router.get('/GetAllQuestionnaires',GetAllQuestionnaires);
Router.post('/DeleteFullQuestionnaire',DeleteFullQuestionnaire);
Router.post('/AddSubCategory',AddSubCategory);
Router.get('/GetQuestionnaireById/:_QuestionnaireId',GetQuestionnaireById);
Router.post('/GetQuestionnaireByName',GetQuestionnaireByName);
Router.post('/MapSubCategoryAndTopic',MapSubCategoryAndTopic);
Router.get('/GetALlMappedValues',GetALlMappedValues);
Router.post('/DeleteCategoryByName',DeleteCategoryByName);
//End Block For Joining Controllers to your Routes

module.exports = Router;