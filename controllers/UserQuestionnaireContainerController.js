const _UserQuestionnaireContainerCluster = require('../models/UserQuestionnaireContainerModel');
const _UserQuestionnaireFinalResultCluster = require('../models/UserQuestionnaireFinalResult');

const UpdateUserQuestionnaireContainerByQuestions = async (req, res) => {
    try {
        let RequestObject = req.body;
        const QuestionnaireToUpdate = await _UserQuestionnaireContainerCluster.updateOne(
            { UserId: RequestObject.UserId },
            // {$pull:{Questions:{_id:RequestObject.Payload[0]._id}}}
            { $pull: { Questions: { Question: RequestObject.Payload[0].Question } } }
        );
        res.json({
            Message: 'True',
            Data: true,
            Result: true
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: true,
            Result: true
        })
    }
}

const AddUserQuestionnaireResult = async (req, res) => {
    try {
        const { UserId, UserEmail, UserName, FinalResult } = req.body;
        const ExamPlanToFind = await _UserQuestionnaireContainerCluster.findOne({UserId:UserId}).lean();
        let CorrectQuestions = [];
        FinalResult.forEach(Objects => {
            if (Objects.UserAnswer === 'Correct') {
                CorrectQuestions.push(Objects);
            }
        })
        const DocToSave = new _UserQuestionnaireFinalResultCluster({
            UserId: UserId,
            UserName: UserName,
            UserEmail: UserEmail,
            ExamPlan: ExamPlanToFind.ExamPlan,
            Questions: FinalResult,
            CorrectQuestions: CorrectQuestions,
            TotalQuestions: FinalResult.length,
            TotalCorrectQuestions: CorrectQuestions.length
        })
        const Result = await DocToSave.save();
        res.json({
            Message: 'Final Result Saved Successfuly',
            Data: true,
            Result: Result
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: true,
            Result: true
        })
    }
}

const GetFinalResult = async (req, res) => {
 try {
        const {_UserId} = req.params;
        console.log(_UserId);
        const DocumentToGet = await _UserQuestionnaireFinalResultCluster.findOne(
         {_id:_UserId}
         )
         res.json({
             Message:'Data Found Successfuly',
             Data:true,
             Result:DocumentToGet
         })
 } catch (error) {
    res.json({
        Message: error.message,
        Data: true,
        Result: true
    })
 }
}

module.exports = {
    UpdateUserQuestionnaireContainerByQuestions,
    AddUserQuestionnaireResult,
    GetFinalResult
}