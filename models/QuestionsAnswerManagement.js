const mongoose = require('mongoose');

// Date
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();
const time = today.getTime();

//Start Block Schema Creating
const QuestionAnswersManagementSchema = mongoose.Schema({
    Questions:{},
    CreatedDate: {
        type: String,
        default: `${year}-${month}-${day}-${time}`,
    }
})

//Exporting The Schema
module.exports = mongoose.model('QuestionAnswersManagementSchemaCollection', QuestionAnswersManagementSchema);