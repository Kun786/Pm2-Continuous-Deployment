const _ExamSubscriptionPlanModel = require('../models/ExamSubscriptionManagementModel');
const _QuestionnaireManagementCluster = require('../models/QuestionnaireManagementModel');

const CreateExamSubscriptionPlan = async (req, res) => {
    try {
        const { ExamPlan, Price, TotalQuestions } = req.body;
        const _FindTotalExams = await _ExamSubscriptionPlanModel.find();
        const _FindAlreadyExistExamPlan = await _ExamSubscriptionPlanModel.findOne(
            { ExamPlan: ExamPlan }
        )
        if (_FindTotalExams.length >= 5) {
            return res.json({
                Message: 'You can Only Add 5 Exams Plan',
                Data: false,
                Result: null
            })
        }
        if (_FindAlreadyExistExamPlan !== null) {
            return res.json({
                Message: `Warning ! Plan already exist with this ${ExamPlan}`,
                Data: true,
                Result: true,
                Status: 1
            })
        }

        const _CreateSubscription = new _ExamSubscriptionPlanModel({
            ExamPlan: ExamPlan,
            Price: Price,
            TotalQuestions: TotalQuestions,
            QuestionToAdd: TotalQuestions
        });
        const _SaveDataTODatabase = await _CreateSubscription.save();
        res.json({
            Message: 'ExamSubscitpionPlan has Created Successfuly',
            Data: true,
            Result: _SaveDataTODatabase,
            Status: 2
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}


const GetAllExamSubscriptionPlan = async (req, res) => {
    try {
        const _GetAllExamSubscriptionPlan = await _ExamSubscriptionPlanModel.find().populate('QuestionnaireId').lean();
        res.json({
            Message: 'All Exams Found Successfuly',
            Data: true,
            Result: _GetAllExamSubscriptionPlan
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}

const DeleteExamSubscriptionPlan = async (req, res) => {
    try {
        const { _UserId } = req.params;
        const ExamPlan = req.body;
        const QuestionniareToFind = await _QuestionnaireManagementCluster.findOne(
            { ExamPlan: ExamPlan }
        )

        if (QuestionniareToFind !== null) {
            return res.json({
                Message: 'You cannot Delete the Exam Because It has Questions in it Go Delete The Questions first then Delete the ExamPlan',
                Data: false,
                Result: null
            })
        }
        const ExamToDelete = await _ExamSubscriptionPlanModel.deleteOne(
            { _id: _UserId }
        )
        res.json({
            Message: 'Exam Deleted Successfuly',
            Data: true,
            Result: true
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}

const GetExamSubscriptionbyPlanName = async (req, res) => {
    try {
        const ExamPlan = req.body;
        const GetExamByName = await _ExamSubscriptionPlanModel.find(
            { ExamPlan: ExamPlan },
            { TotalQuestions: 1, ExamPlan: 1, QuestionToAdd: 1 }
        )
        res.json({
            Message: 'Data Found Successfuly',
            Data: true,
            Result: GetExamByName
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}

const UpdateExamSubscriptionQuestionLimitByName = async (req, res) => {
    try {
        const { ExamPlan, TotalQuestions } = req.body;
        const GetQuestionnaireDoc = await _QuestionnaireManagementCluster.findOne(
            { ExamPlan: ExamPlan }
        )

        if (GetQuestionnaireDoc !== null) {
            if (TotalQuestions <= GetQuestionnaireDoc.Questions.length) {
                return res.json({
                    Message: `There are Already ${GetQuestionnaireDoc.Questions.length} in Your Questionnaire How can you Update you ExamPlan With a Value Less Than you Total Questions in Your ExamPlan`,
                    Data: false,
                    Result: null
                })
            }
        }

        if (GetQuestionnaireDoc !== null) {
            await _ExamSubscriptionPlanModel.updateOne(
                { ExamPlan: ExamPlan },
                { Status: 1, TotalQuestions: TotalQuestions, QuestionToAdd: TotalQuestions - GetQuestionnaireDoc.Questions.length }
            )
        } else {
            await _ExamSubscriptionPlanModel.updateOne(
                { ExamPlan: ExamPlan },
                { Status: 1, TotalQuestions: TotalQuestions, QuestionToAdd: TotalQuestions }
            )
        }
        res.json({
            Message: 'Updated Successfuly',
            Data: true,
            Result: true
        })
    } catch (error) {
        console.log(error);
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}

module.exports = {
    CreateExamSubscriptionPlan,
    GetAllExamSubscriptionPlan,
    DeleteExamSubscriptionPlan,
    GetExamSubscriptionbyPlanName,
    UpdateExamSubscriptionQuestionLimitByName
}