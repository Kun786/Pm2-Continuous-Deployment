const mongoose = require('mongoose');

// Date
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();

//Start Block for Schema Creating
const DummyExamModel = mongoose.Schema({
    ExamPlan: { type: String, required: true, unique:true },
    Price: { type: Number, required: true },
    TotalQuestions: { type: Number, required: true },
    Remarks: { type: String, required: true },
    CreatedDate: {
        type: String,
        default: `${year}-${month}-${day}`,
    }
}, { timestamps: true });
//End Block for Schema Creating

module.exports = mongoose.model('DummyExamModelCollection', DummyExamModel);