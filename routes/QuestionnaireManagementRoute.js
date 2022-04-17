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
    DummyExam,
    GetDummyExam,
    DeleteById,
    EditDummyExamById,
    GetEditDummyExamById
 } = require('../controllers/QuestionnaireManagementController');
//End Block For Accessing The Controlers


//Start Block For Joining Controllers to your Routes
Router.post('/DummyExam',DummyExam);
Router.get('/GetDummyExam',GetDummyExam);
Router.post('/CreateQuestionnaire',CreateQuestionnaire);
Router.get('/GetAllQuestionnaires',GetAllQuestionnaires);
Router.post('/DeleteFullQuestionnaire/:_ExamId',DeleteFullQuestionnaire);
Router.get('/GetQuestionnaireById/:_QuestionnaireId',GetQuestionnaireById);
Router.delete('/DeleteById/:_ExamId',DeleteById);
Router.post('/EditDummyExamById/:_ExamId',EditDummyExamById);
Router.get('/GetEditDummyExamById/:_ExamId',GetEditDummyExamById);
//End Block For Joining Controllers to your Routes

module.exports = Router;