const _ExamSubscriptionPlanModel = require('../models/ExamSubscriptionManagementModel');

const CreateExamSubscriptionPlan = async (req, res) => {
    try {
        const {ExamPlan,Price} = req.body;
        const _FindTotalExams =  await _ExamSubscriptionPlanModel.find();
        const _FindAlreadyExistExamPlan = await _ExamSubscriptionPlanModel.findOne(
            {ExamPlan:ExamPlan}
        )
        if(_FindTotalExams.length >=5 ){
            return res.json({
                Message:'You can Only Add 5 Exams Plan',
                Data:false,
                Result:null
            })
        }
        if(_FindAlreadyExistExamPlan !== null){
            return res.json({
                Message:`Warning ! Plan already exist with this ${ExamPlan}`,
                Data:true,
                Result:true,
                Status:1 
            })
        }

        const _CreateSubscription = new _ExamSubscriptionPlanModel({
            ExamPlan:ExamPlan,
            Price:Price
        });
        const _SaveDataTODatabase = await _CreateSubscription.save();
         res.json({
             Message:'ExamSubscitpionPlan has Created Successfuly',
             Data:true,
             Result:_SaveDataTODatabase,
             Status:2
         })
    } catch (error) {
        res.json({
            Message:error.message,
            Data:false,
            Result:null
        })
    }
}


const GetAllExamSubscriptionPlan = async (req, res) => {
    try {
        const _GetAllExamSubscriptionPlan = await _ExamSubscriptionPlanModel.find();
        res.json({
            Message:'All Exams Found Successfuly',
            Data:true,
            Result:_GetAllExamSubscriptionPlan
        })
    } catch (error) {
        res.json({
            Message:error.message,
            Data:false,
            Result:null
        })
    }
}
module.exports = { CreateExamSubscriptionPlan, GetAllExamSubscriptionPlan }