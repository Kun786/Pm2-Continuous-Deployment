const _QuestionnaireCluster = require('../models/QuestionnaireManagementModel');
const _ExamSubscriptionManagementModel = require('../models/ExamSubscriptionManagementModel');
const _SubCategoryModel = require('../models/SubCategoryModel');
const _MapSubCategoryAndTopicCollection = require('../models/MapSubcategoryAndTopic');


const CreateQuestionnaire = async (req, res) => {
    try {
        let a = true;
        const { ExamPlan, Price, QuestionsArray } = req.body;
        const _CheckExamPlanFromDataBase = await _QuestionnaireCluster.find({ ExamPlan: ExamPlan }).lean();
        const GetTotalQuestions = await _ExamSubscriptionManagementModel.findOne({ExamPlan:ExamPlan}).lean();

        if(GetTotalQuestions.Status === 1){
            const UpdateExamStatus = await _ExamSubscriptionManagementModel.updateOne(
                {ExamPlan:ExamPlan},
                {$inc:{QuestionToAdd:-QuestionsArray.length}}
                )
        }

        // const UpdatedTotalQuestions = await _ExamSubscriptionManagementModel.findOne({ExamPlan:ExamPlan}).lean();
        if(GetTotalQuestions.QuestionToAdd === 0){
                const UpdateExamStatus = await _ExamSubscriptionManagementModel.updateOne(
                    {ExamPlan:ExamPlan},
                    {Status:0}
                    )
                return res.json({
                    Message:"Question Limit has Exceeded",
                    Data:false,
                    Result:null
                })
        }

        if (_CheckExamPlanFromDataBase.length >= 1) {
            const _AddMoreQuestionsToExam = await _QuestionnaireCluster.updateOne(
                { _id: _CheckExamPlanFromDataBase[0]._id }, //filter
                { $push: { Questions: QuestionsArray } } //operations
            );
            res.json({
                Message: `Questions Has Added Successfuly To Already Exists Exam Plan ${ExamPlan}`,
                Data: true,
                Result: _AddMoreQuestionsToExam,
                Status: 1
            })
        } else {
            const _CreateExam = new _QuestionnaireCluster({
                ExamPlan: ExamPlan,
                Price: Price,
                Questions: QuestionsArray,

            });
            const _AddExam = await _CreateExam.save();
            const _AddIdToExamPlan = await _ExamSubscriptionManagementModel.updateOne(
                {ExamPlan:ExamPlan},
                {QuestionnaireId:_AddExam._id}
            )
            res.json({
                Message: `ExamPlan and Question Added Successfuly`,
                Data: true,
                Result: _AddExam,
                Status: 2,
                Questions:QuestionsArray
            })
        }
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}

const GetAllQuestionnaires = async (req, res) => {
    try {
        const _GetAllQuestionnaires = await _QuestionnaireCluster.find().lean();
        res.json({
            Message: 'All Exams Found Successfuly',
            Data: true,
            Result: _GetAllQuestionnaires
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}

const GetQuestionnaireById = async (req, res) => {
    try {
        const _QuestionnaireId = req.params._QuestionnaireId;
        const _GetQuestionnaireById = await _QuestionnaireCluster.findOne(
            { _id: _QuestionnaireId }
        ).lean();
        res.json({
            Message: 'Questionnaire Found Successfully',
            Data: true,
            Result: _GetQuestionnaireById
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}

const GetQuestionnaireByName = async (req, res) => {
    try {
        const ExamPlan = req.body;
        const DocToGet = await _QuestionnaireCluster.findOne(
            { ExamPlan:ExamPlan }
        )
        res.json({
            Message:'Document Found Successfuly',
            Data:true,
            Result:DocToGet
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
} 

const DeleteFullQuestionnaire = async (req, res) => {
    try {

        // const Promise = [
        //     _ExamSubscriptionManagementModel.updateOne(
        //         { ExamPlan: ExamPlan },
        //         { QuestionToAdd: GetExam.TotalQuestions }
        //     ),
        //     _QuestionnaireCluster.deleteOne(
        //         { ExamPlan: ExamPlan }
        //     )
        // ]
        // const ResolvePromise = await Promise.all(Promise);


        const ExamPlan = req.body;
        const GetExam = await _ExamSubscriptionManagementModel.findOne(
            {ExamPlan:ExamPlan}
        )
        const UpdateExam = await _ExamSubscriptionManagementModel.updateOne(
            {ExamPlan:ExamPlan},
            {QuestionToAdd:GetExam.TotalQuestions}
        )
        const _DocToRemove = await _QuestionnaireCluster.deleteOne(
            {ExamPlan:ExamPlan}
        );
        res.json({
            Message:'Questionnaire Deleted Successfuly Now You Delete the Exam',
            Data:true,
            Result:true
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}

// const DeleteQuestionnaireSpecificQuestion = async(req, res) => {
//     try {
//         const _GetExamId = req.body.ExamId;
//         const _GetQuestionnaireId = req.body.QuesstionnaireId;
//         const _UpdateExam = await _QuestionnaireCluster.updateOne(
//             {_id:_GetExamId },
//             { $set: { ExamPlan:"Testing"} },
//             { new: true }
//             );
//             // const _UpdateExamQuestionNumber = await _QuestionnaireCluster.updateMany(
//             //     {_id:_GetExamId},
//             //     {Question, $inc: {QuestionNo:1}},
//             //     )
//             res.json({
//                 Message:'Exam Questionnaire has Updated Successfuly',
//                 Data:true,
//                 UpdateQuestionNo:_UpdateExamQuestionNumber
//             })
//     } catch (error) {
//         res.json({
//             Message:error.message,
//             Data:false,
//             Result:null
//         })
//     }
// }

const AddSubCategory = async(req, res) => {
    try {
        const { SubCategory } = req.body;
        const CheckIfSubcategoryExist = await _SubCategoryModel.findOne(
            {SubCategory:SubCategory}
        ) 
        
        if(CheckIfSubcategoryExist !== null){
            return res.json({
                Message:'SubCategory Already Exists and You cannot Duplicate it',
                Data:false,
                Result:null
            })
        }
       
        const DocToSave = new _SubCategoryModel({
            SubCategory:SubCategory
        })
        const SavedData = await DocToSave.save();
        res.json({
            Message:'SubCategory Saved Successfuly',
            Data:true,
            Result:SavedData,
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}

const MapSubCategoryAndTopic = async(req, res) => {
    try {
        const { Category, SubCategory } = req.body;
         SubCategoryObject = {SC:SubCategory}
        const FindIfTopicAlreadyExists = await _MapSubCategoryAndTopicCollection.findOne(
            {Category:Category}
            )

        const FindIfSubCategoryAlreadyExists = await _MapSubCategoryAndTopicCollection.findOne(
            {Category:Category,'SubCategory.SC':SubCategory}
        )
            console.log(FindIfSubCategoryAlreadyExists);
        if( FindIfSubCategoryAlreadyExists !== null ){
            return res.json({
                Message:`${SubCategory} Already Exists for ${Category}`,
                Data:false,
                Result:null,
            })
        }

        if(FindIfTopicAlreadyExists !== null){
            UpdateToDoc = await _MapSubCategoryAndTopicCollection.updateOne(
                {Category:Category},
                {$push:{SubCategory:SubCategoryObject}}
            )
            return res.json({
                Message:`${SubCategory} added into ${Category}`,
                Data:true,
                Result:true,
                Status:2
            })
        }
        
        const DocToSave = new _MapSubCategoryAndTopicCollection({
            Category:Category,
            SubCategory:SubCategoryObject
        })
        const SavedData = await DocToSave.save();
        res.json({
            Message:'SubCategory Saved Successfuly',
            Data:true,
            Result:SavedData,
            Status:1
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}

const GetSubCategory = async(req, res) => {
    try {
        const GetAllSubCategory = await _SubCategoryModel.find();
        res.json({
            Message:'Data Found Successfuly',
            Data:true,
            Result:GetAllSubCategory
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}

const GetALlMappedValues = async (req, res) => {
    try {
        const GetAllMappedValuesFromDb = await _MapSubCategoryAndTopicCollection.find();
        res.json({
            Message:'Found Successfuly',
            Data:true,
            Result:GetAllMappedValuesFromDb
        })        
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}

const DeleteCategoryByName = async(req, res) => {
    try {
        const {SubCategory} = req.body;
        const CheckIfSubCategoryMappedWithQuestionnaire = await _MapSubCategoryAndTopicCollection.find(
            {SubCategory:SubCategory}
        )
        if(CheckIfSubCategoryMappedWithQuestionnaire.length !== 0){
            return res.json({
                Message:'You Cannot Delete SubCategory As It is Mapped With Topics Unpair It With Topic and Then Delete',
                Data:false,
                Result:null
            })
        }

        const DocToDelete = await _SubCategoryModel.deleteOne(
            {SubCategory:SubCategory}
        )
        res.json({
            Message:'Deleted Successfuly',
            Data:true,
            Result:true
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}

module.exports = {
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
}