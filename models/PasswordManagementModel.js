const mongoose = require('mongoose');

// Date
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();

const PasswordManagementSchema = new mongoose.Schema({
    UserId: { type: mongoose.Schema.Types.ObjectId, required:true, ref:'UserRegisterCollection' },
    ResetToken: { type: String, required: true },
    CreatedDate: {
        type: String,
        default: `${year}-${month}-${day}`,
    }
})

module.exports = mongoose.model('PasswordManagementCollection',PasswordManagementSchema);