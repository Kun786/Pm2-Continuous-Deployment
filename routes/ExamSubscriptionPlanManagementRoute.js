//Dependencies
const express = require('express');
const Router = express.Router();
//Dependencies

//Calling Controllers
const {
    CreateExamSubscriptionPlan,
    GetAllExamSubscriptionPlan
} = require('../controllers/ExamSubscriptionPlanManagementController');
//Calling Controllers

//Joining Routes to Controllers Via Http
Router.post('/CreateExamSubscriptionPlan',CreateExamSubscriptionPlan);
Router.get('/GetAllExamSubscriptionPlan',GetAllExamSubscriptionPlan);
//Joining Routes to Controllers Via Http

module.exports = Router;