const _UserManagementModel =  require('../models/UserManagementModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserLogin = async(req, res) => {
    try {
        const { Email, Password } = req.body;
        let _UserToAuthenticate = await _UserManagementModel.findOne({ Email: Email });
        if (_UserToAuthenticate === null) {
            return res.json({
                Message: 'Authentication Failed Either Incorrect Password or Email',
                Result: null,
                Data:false
            })
        }

        const _Result = await bcrypt.compare(Password, _UserToAuthenticate.Password);
        if (!_Result) {
            return res.json({
                Message: 'Authentication Failed Either Incorrect Password or Email',
                Result: null,
                Data:false
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

const UserRegister = async(req, res) => {
    try {
        const { Name, Email, Password, CourseName} = req.body;
        console.log(req.body);
        const _GetUserLength = _UserManagementModel.find();
        if (_GetUserLength.length >= 1) {
            res.json({
                Message:`Admin Regesteration is Constraint`,
                Status:null,
                Data:false
            })
        } else {
            const CourseToSave = {CName:CourseName};
            const _RegisterAdmin = new _UserManagementModel({
                Name:Name,
                Email:Email,
                Password:Password,
                CourseName:CourseToSave            
            });
            await _RegisterAdmin.save();
            res.json({
                Message:`User Register Successfully`,
                Data:true,
                Result:_RegisterAdmin
            })
        }
    } catch (error) {
        res.json({ Message: error.message, Result: null, Data: false });
    }
}

const GetAllUser = async (req, res) => {
    try {
        const _GetAllUser = await _UserManagementModel.find().lean();
        res.json({
            Message:'Found Successfuly',
            Data:true,
            Result:_GetAllUser
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
            {_id:_UserId}
            )
            res.json({
                Message:'User has Removed Successfuly',
                Data:true,
                Result:_UserToDelete
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
            {_id:_UserId},
            {$set:{Status:1}}
        )
        res.json({
            Message:"User Activated",
            Data:true,
            Result:_UserStatusToUpdate
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
            {_id:_UserId},
            {$set:{Status:0}}
        )
        res.json({
            Message:"User Deactivated",
            Data:true,
            Result:_UserStatusToUpdate
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
            {_id:_UserId}
        )
        res.json({
            Message:'User Found',
            Data:true,
            Result:_GetUserInformationById
        })
    } catch (error) {
        res.json({
            Error: error.message,
            Data: false,
            Result: null
        })
    }
}

module.exports= { 
    UserLogin, 
    UserRegister, 
    GetAllUser,
    DeleteUserById,
    ActiveUserStatusById,
    DeactivateUserStatusById,
    GetUserInformationById
 }