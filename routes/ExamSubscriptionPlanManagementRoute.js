//Dependencies
const express = require('express');
const Router = express.Router();
//Dependencies

//Calling Controllers
const {
    CreateExamSubscriptionPlan,
    GetAllExamSubscriptionPlan,
    DeleteExamSubscriptionPlan,
    GetExamSubscriptionbyPlanName,
    UpdateExamSubscriptionQuestionLimitByName
} = require('../controllers/ExamSubscriptionPlanManagementController');
//Calling Controllers

//Joining Routes to Controllers Via Http
Router.post('/CreateExamSubscriptionPlan',CreateExamSubscriptionPlan);
Router.get('/GetAllExamSubscriptionPlan',GetAllExamSubscriptionPlan);
Router.post('/DeleteExamSubscriptionPlan/:_UserId',DeleteExamSubscriptionPlan);
Router.post('/UpdateExamSubscriptionQuestionLimitByName',UpdateExamSubscriptionQuestionLimitByName);
Router.post('/GetExamSubscriptionbyPlanName',GetExamSubscriptionbyPlanName);
//Joining Routes to Controllers Via Http

module.exports = Router;