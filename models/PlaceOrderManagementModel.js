//Dependencies
const mongoose = require('mongoose');

// Date
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();
const time = today.getTime();

//Start Block Schema Creating
const PlaceOrderSchema = mongoose.Schema({
    ExamPlan: {type:String, required:true},
    ExamPrice: {type:Number, required:true},
    TaxPrice: {type:Number, required:true},
    TotalPricePaid: {type:Number, required:true},
    TotalQuestions: {type:Number, required:true},
    UserEmail: {type:String, required:true},
    UserName: {type:String, required:true},
    FirstName: {type:String, required:true},
    LastName: {type:String, required:true},
    Country: {type:String, required:true},
    StreetName: {type:String, required:true},
    StateProvince: {type:String, required:true},
    City: {type:String, required:true},
    Zip: {type:Number, required:true},
    PaidAmountByStudent: {type:Number, required:true},
    Token: {type:String, required:true},
    PaymentMethod: {type:String, required:true},
    StudentCountry: {type:String, required:true},
    PaymentBy: {type:String, required:true},
    CustomerId: {type:String, required:true},
    CustomerName: {type:String, required:true},
    CreatedDate: {
        type: String,
        default: `${year}-${month}-${day}-${time}`,
    }
})


//Exporting The Schema
module.exports = mongoose.model('PlaceOrderSchemaCollection', PlaceOrderSchema);