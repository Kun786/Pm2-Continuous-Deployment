const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

// Date
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();

//Start Block for Schema Creating
const QuestionnaireModel = mongoose.Schema({
    ExamPlan: { type: String, required: true, unique:true },
    Price: { type: Number, required: true },
    Questions: {
        type: [{
            QuestionId: { type: mongoose.Schema.ObjectId },
            Question: { type: String },
            Key1: { type: String },
            Key2: { type: String },
            Key3: { type: String },
            Key4: { type: String },
            AnswerKey: { type: String },
        }],required:true},
    CreatedDate: {
        type: String,
        default: `${year}-${month}-${day}`,
    }
}, { timestamps: true });
//End Block for Schema Creating

module.exports = mongoose.model('QuestionnaireCollection', QuestionnaireModel);