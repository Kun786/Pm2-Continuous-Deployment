const _AdminManagementModel = require('../models/AdminManagementModel');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const AdminRegister= async(req,res) => {
    try {
        const {FirstName, LastName, Email, Password} = req.body;
        const _GetAdminUserLength = _AdminManagementModel.find();
        if (_GetAdminUserLength.length >= 1) {
            res.json({
                Message:`Admin Regesteration is Constraint`,
                Status:null,
                Data:false
            })
        } else {
            const _RegisterAdmin = new _AdminManagementModel({
                FirstName:FirstName,
                LastName:LastName,
                Email:Email,
                Password:Password,
                RealPassword:Password            
            });
            await _RegisterAdmin.save();
            res.json({
                Message:`User Register Successfully`,
                Data:true,
                Result:_RegisterAdmin
            })
        }
    } catch (error) {
        res.json({ Message: error.message, Result: false });
    }
}

const AdminLogin = async (req,res) => {
    try {
        _Email = req.body.Email;
        _Password = req.body.Password;
        let _AdminToAuthenticate = await _AdminManagementModel.findOne({ Email: _Email });
        if (_AdminToAuthenticate === null) {
            return res.json({
                Message: 'Authentication Failed Either Incorrect Password or Email',
                Result: null,
                Data:false
            })
        }

        const _Result = await bcrypt.compare(_Password, _AdminToAuthenticate.Password);
        if (!_Result) {
            return res.json({
                Message: 'Authentication Failed Either Incorrect Password or Email',
                Data: false,
                Result: null
            })
        }

        const _Token = jwt.sign(
            {
                Email: _AdminToAuthenticate.Email,
                UserId: _AdminToAuthenticate._id
            },
            'UserLogin',
            { expiresIn: '1h' }
        )

        return res.json({
            Message: 'Authentication SuccessFull',
            Data: true,
            Token: _Token,
            Result: _AdminToAuthenticate
        })
   
        

    } catch (error) {
        res.json({
            Error: error.message,
            Data: false,
            Result: null
        })
    }
}

const GetAdminDetails = async(req,res)=>{
    try {
        const _GetAdminId = await _AdminManagementRegisterModel.find();
        if(_GetAdminId.length <= 0){return res.json({Message:`Not Found`, Data:false, Result:null})}
        if(_GetAdminId.length > 0){return res.json({Message:`User Found Successfully`, Data:true, Id:_GetAdminId[0]._id, Result:_GetAdminId})}
    } catch (error) {
        res.json({
            Message:error.Message,
            Data:false,
            Result:null
        })
    }
}

module.exports = { AdminRegister, AdminLogin, GetAdminDetails };