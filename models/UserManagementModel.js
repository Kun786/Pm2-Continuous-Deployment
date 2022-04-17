const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SaltRounds = 10;

// Date
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();

const UserRegisterSchema = mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    CourseName: [
        {
            CName: { type: String },
            CDetails: { type: mongoose.Schema.Types.ObjectId, ref: 'QuestionnaireCollection' }
        }
    ],
    SaltString: { type: String },
    Status: { type: Number, default: 0 },
    CreatedDate: {
        type: String,
        default: `${year}-${month}-${day}`,
    }
}, { timestamps: true })

// const UserRegisterSchema = mongoose.Schema({
//     Name: { type: String, required: true },
//     Email: { type: String, required: true, unique: true },
//     Password: { type: String, required: true },
//     CourseName: [
//         {
//             CName: { type: String },
//             CDetails: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QuestionnaireCollection' }]
//         }
//     ],
//     SaltString: { type: String },
//     Status: { type: Number, default: 0 },
//     CreatedDate: {
//         type: String,
//         default: `${year}-${month}-${day}`,
//     }
// }, { timestamps: true })

UserRegisterSchema.pre('save', async function (next) {
    try {
        const Salt = await bcrypt.genSalt(SaltRounds);
        const HashedPassword = await bcrypt.hash(this.Password, Salt);
        this.Password = HashedPassword;
        this.SaltString = Salt;
        next();
    } catch (error) {
        return res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
});

module.exports = mongoose.model('UserRegisterCollection', UserRegisterSchema);






