const _OrderModel = require('../models/PlaceOrderManagementModel');

const PlaceOrder = async (req, res) => {
    try {
        const {
            ExamPlan,
            ExamPrice,
            TaxPrice,
            TotalPricePaid,
            TotalQuestions,
            UserEmail,
            UserName,
            FirstName,
            LastName,
            Country,
            StreetName,
            StateProvince,
            City,
            Zip,
            PaidAmountByStudent,
            Token,
            PaymentMethod,
            StudentCountry,
            PaymentBy,
            CustomerId,
            CustomerName
        } = req.body;

        const OrderToSave = new _OrderModel({
            ExamPlan: ExamPlan,
            ExamPrice: ExamPrice,
            TaxPrice: TaxPrice,
            TotalPricePaid: TotalPricePaid,
            TotalQuestions: TotalQuestions,
            UserEmail: UserEmail,
            UserName: UserName,
            FirstName: FirstName,
            LastName: LastName,
            Country: Country,
            StreetName: StreetName,
            StateProvince: StateProvince,
            City: City,
            Zip: Zip,
            PaidAmountByStudent: PaidAmountByStudent,
            Token: Token,
            PaymentMethod: PaymentMethod,
            StudentCountry: StudentCountry,
            PaymentBy: PaymentBy,
            CustomerId: CustomerId,
            CustomerName: CustomerName
        });

        const DataToSave = await OrderToSave.save();
        res.json({
            Message: 'Data Has Saved Successfuly',
            Data: true,
            Result: true
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}

const GetAllOrder = async (req, res) => {
    try {
        const GetAllOrders = await _OrderModel.find().lean();
        res.json({
            Message:'All Orders Found Successfuly',
            Data:true,
            Result:GetAllOrders
        })
    } catch (error) {
        res.json({
            Message:error.message,
            Data:false,
            Result:null
        })
    }
}
module.exports = {
    PlaceOrder,
    GetAllOrder
}



