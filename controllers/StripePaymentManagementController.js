const stripe = require('stripe')('sk_test_51KfinHGzF0vi2xIOFEcwM1Fe9gxY63elTesqljbfozNw8xJenWfSqC0GodlH14K6BOkTnJX6qkgapRhF8GTWr4C10022XBlEMA');

const PayWithStripe = async (req, res) => {
    try {
        const { FirstName, LastName, Country, StreetName, StateProvince, City, Zip, Amount, Token } = req.body;
        const CustomerInformation = await stripe.customers.create({
            name: FirstName,
            source: Token
        });
        const PaymentInformation = await stripe.charges.create({
            amount: Amount * 100,
            currency: 'USD',
            description: 'Student Payment',
            customer:CustomerInformation.id
        });
        res.json({
            Message: 'Your Payment Has Approved',
            Data: true,
            Result: PaymentInformation.status,
            PaymentMethod:PaymentInformation.payment_method_details.card.brand,
            StudentCountry:PaymentInformation.payment_method_details.card.country,
            TransactionNetwrok:PaymentInformation.payment_method_details.card.network,
            PaymentBy:PaymentInformation.payment_method_details.type,
            CustomerId:CustomerInformation.id,
            Receipt_Url:PaymentInformation.receipt_url,
            CustomerName:CustomerInformation.name,
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: false
        })
    }
}


module.exports = { PayWithStripe }
// stripe.charges.create({
//     amount:req.body.Amount,
//     currency:'USD',
//     description:'Testing Purpose',
//     source:req.body.Token
// }, (err, charge) => {
//     if(err){res.json({error:err.message})}
//     res.json({Message:'Payment Made', Body:charge})
// })