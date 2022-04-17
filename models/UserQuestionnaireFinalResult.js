const mongoose = require('mongoose');


// Date
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();
const time = today.getTime();

//Start Block Schema Creating
const UserQuestionnaireFinalResultSchema = mongoose.Schema({
    UserId:{type:String},
    UserName:{type:String},
    UserEmail:{type:String},
    ExamPlan:{type:String},
    Questions:[],
    CorrectQuestions:[],
    TotalQuestions:{type:Number},
    TotalCorrectQuestions:{type:Number},
    QuestionnaireAttempted: {
        type: String,
        default: `${year}-${month}-${day}-${time}`,
    }
})


//Exporting The Schema
module.exports = mongoose.model('UserQuestionnaireFinalResultCollection', UserQuestionnaireFinalResultSchema);