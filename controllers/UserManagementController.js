const _UserManagementModel = require('../models/UserManagementModel');
const _QuestionnaireCluster = require('../models/QuestionnaireManagementModel');
const _UserQuestionnaireContainerCluster = require('../models/UserQuestionnaireContainerModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserLogin = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        let _UserToAuthenticate = await _UserManagementModel.findOne(
            { Email: Email },
            // {Email:1, Name:1, Password:1} 
            ).lean();
        if (_UserToAuthenticate === null) {
            return res.json({
                Message: 'Authentication Failed Either Incorrect Password or Email',
                Result: null,
                Data: false
            })
        }

        const _Result = await bcrypt.compare(Password, _UserToAuthenticate.Password);
        if (!_Result) {
            return res.json({
                Message: 'Authentication Failed Either Incorrect Password or Email',
                Result: null,
                Data: false
            })
        }

        // if(_UserToAuthenticate.Status === 0){
        //     return res.json({
        //         Message:"Please Contact Admin For Approval",
        //         Data:false,
        //         Result:null
        //     })
        // }
        const _Token = jwt.sign(
            {
                Email: _UserToAuthenticate.Email,
                UserId: _UserToAuthenticate._id
            },
            'UserLogin',
            { expiresIn: '1h' }
        )

        return res.json({
            Message: 'Authentication SuccessFull',
            Data: true,
            Token: _Token,
            Result: _UserToAuthenticate
        })
    } catch (error) {
        res.json({
            Error: error.message,
            Data: false,
            Result: null
        })
    }
}

const UserRegister = async (req, res) => {
    try {
        const { Name, Email, Password, CourseName } = req.body;
        const QuestionnaireToFind = await _QuestionnaireCluster.findOne({ ExamPlan: CourseName });
        const QuestionnaireId = QuestionnaireToFind._id;
        const CourseToSave = { CName: CourseName, CDetails: QuestionnaireId };
        const _RegisterAdmin = new _UserManagementModel({
            Name: Name,
            Email: Email,
            Password: Password,
            CourseName: CourseToSave
        });
        const SavedUser = await _RegisterAdmin.save();

        const UserQuestionnaireContainerToSave = new _UserQuestionnaireContainerCluster({
            UserId: SavedUser._id,
            UserName: SavedUser.Name,
            UserEmail: SavedUser.Email,
            Questions: QuestionnaireToFind.Questions,
            TotalQuestions: QuestionnaireToFind.Questions.length,
            ExamPlan:SavedUser.CourseName[0].CName
        })
        await UserQuestionnaireContainerToSave.save();
        res.json({
            Message: `User Register Successfully`,
            Data: true,
            Result: _RegisterAdmin,
            UserLogin: UserLogin
        })
    } catch (error) {
        res.json({ Message: error.message, Result: null, Data: false });
    }
}

const GetAllUser = async (req, res) => {
    try {
        const _GetAllUser = await _UserManagementModel.find().lean();
        res.json({
            Message: 'Found Successfuly',
            Data: true,
            Result: _GetAllUser
        })
    } catch (error) {
        res.json({
            Error: error.message,
            Data: false,
            Result: null
        })
    }
}

DeleteUserById = async (req, res) => {
    try {
        const _UserId = req.params._UserId;
        const _UserToDelete = await _UserManagementModel.remove(
            { _id: _UserId }
        )
        res.json({
            Message: 'User has Removed Successfuly',
            Data: true,
            Result: _UserToDelete
        })
    } catch (error) {
        res.json({
            Error: error.message,
            Data: false,
            Result: null
        })
    }
}

ActiveUserStatusById = async (req, res) => {
    try {
        const _UserId = req.params._UserId;
        const _UserStatusToUpdate = await _UserManagementModel.updateOne(
            { _id: _UserId },
            { $set: { Status: 1 } }
        )
        res.json({
            Message: "User Activated",
            Data: true,
            Result: _UserStatusToUpdate
        })
    } catch (error) {
        res.json({
            Error: error.message,
            Data: false,
            Result: null
        })
    }
}

DeactivateUserStatusById = async (req, res) => {
    try {
        const _UserId = req.params._UserId;
        console.log(_UserId);
        const _UserStatusToUpdate = await _UserManagementModel.updateOne(
            { Email: _UserId },
            { $set: { Status: 1 } }
        )
        res.json({
            Message: "User Deactivated",
            Data: true,
            Result: _UserStatusToUpdate
        })
    } catch (error) {
        res.json({
            Error: error.message,
            Data: false,
            Result: null
        })
    }
}

GetUserInformationById = async (req, res) => {
    try {
        const _UserId = req.params._UserId;
        const _GetUserInformationById = await _UserManagementModel.findOne(
            { _id: _UserId }
        )
        res.json({
            Message: 'User Found',
            Data: true,
            Result: _GetUserInformationById
        })
    } catch (error) {
        res.json({
            Error: error.message,
            Data: false,
            Result: null
        })
    }
}

const GetUserWithQuestionnaireInformation = async (req, res) => {
    try {

        const { _UserId } = req.params;
        const GetUserWithQuestionnaireInformationWithPopulation = await _UserManagementModel.findOne(
            { _id: _UserId },
            { _id: 1, Name: 1, Email: 1, Status: 1, CreatedDate: 1, CourseName: 1 }
        ).populate('CourseName.CDetails').lean();
        res.json({
            Message: 'Find Successfully',
            Data: true,
            Result: GetUserWithQuestionnaireInformationWithPopulation
        })
    } catch (error) {
res.json({
    Message: error.message,
    Data: false,
    Result: null
})
    }
}

// const GetUserWithQuestionnaireInformation = async (req, res) => {
//     try {
//         const { _UserId } = req.params;
//         const GetUserWithQuestionnaireInformationWithPopulation = await _UserQuestionnaireContainerCluster.findOne(
//             { UserId: _UserId },
//         )
//         res.json({
//             Message: 'Find Successfully',
//             Data: true,
//             Result: GetUserWithQuestionnaireInformationWithPopulation
//         })
//     } catch (error) {
//         res.json({
//             Message: error.message,
//             Data: false,
//             Result: null
//         })
//     }
// }

module.exports = {
    UserLogin,
    UserRegister,
    GetAllUser,
    DeleteUserById,
    ActiveUserStatusById,
    DeactivateUserStatusById,
    GetUserInformationById,
    GetUserWithQuestionnaireInformation
}
