const express = require('express');
const Router = express.Router();

const { 
    AddQuestionsForExams,
    GetAllQuestionsAnswers,
    DeleteQuestionById
} = require('../controllers/QuestionAnswersManagementController');

Router.post('/AddQuestionsForExams',AddQuestionsForExams);
Router.get('/GetAllQuestionsAnswers',GetAllQuestionsAnswers);
Router.delete('/DeleteQuestionById/:_UserId',DeleteQuestionById);


module.exports = Router;
