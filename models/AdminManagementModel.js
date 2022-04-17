//Dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SaltRounds = 10;

// Date
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();
const time = today.getTime();

//Start Block Schema Creating
const AdminRegisterSchema = mongoose.Schema({
    FirstName: { type: String, required: true},
    LastName: { type: String, required: true},
    Email: { type: String, required: true, unique:true},
    Password: { type: String, required: true},
    SaltString: { type:String},
    RealPassword: { type:String },
    Status: { type:Number, default:1 },
    CreatedDate: {
        type: String,
        default: `${year}-${month}-${day}-${time}`,
    }
})

AdminRegisterSchema.pre('save', function(next){
    bcrypt.genSalt(SaltRounds,(err,salt)=>{
        if(salt){
        this.SaltString=salt;
        bcrypt.hash(this.Password,salt,(err,hash)=>{
            this.Password=hash;
            next();
        })
    }
    else {
        res.json({
            Error:err.message
        })
    }
    })
});
//End Block Schema Creating

//Exporting The Schema
module.exports = mongoose.model('AdminRegisterCollection', AdminRegisterSchema);