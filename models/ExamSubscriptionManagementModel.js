const mongoose = require('mongoose');

// Date
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();
const time = today.getTime();

//Start Block For Schema Creation
const ExamSubscriptionPlan = mongoose.Schema({
    ExamPlan: { type: String, required: true, unique:true },
    Price: { type: Number, required: true },
    TotalQuestions: {type:Number, required: true },
    Status: { type:Number, default:1 },
    QuestionToAdd: { type:Number, default:0 }, 
    CreatedDate: {
        type: String,
        default: `${year}-${month}-${day}-${time}`,
    },
    QuestionnaireId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QuestionnaireCollection' }]
},{timestamps:true});
//End Block For Schema Creatiion

module.exports = mongoose.model('ExamSubscriptionPlanCollection',ExamSubscriptionPlan);
