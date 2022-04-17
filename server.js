//Block Start Dependencies
const express = require('express');
const cors = require('cors');
const path = require('path');
const Database = require('./configuration/DatabaseConfiguration');
const fs = require('fs');
// const Database;
//Block End Dependencies


//Block Start Initialize the app
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());
app.use(express.raw());
app.use(cors());
const PORT = process.env.PORT || 3636;
//Block End Intialize the app


//Start Block Setting th Headers for your Application
app.all('*', (req, res, next) => {
    // This is how we protect the api
    res.header('Access-Control-Allow-Origin', '*');// So it make the header allow to the origin when cross platfrom try to exchange the data
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        //Mehtod is a property which help us to use the Methods by request. Browers send the options request before your Mthods request
    }
    next(); //if nothing of the response sent back so next() means other rou
});
//End Block Setting the Header for your Application

//Start Block Accessing The Routes in the Entry Point

const _QuestionaireManagementRoute = require('./routes/QuestionnaireManagementRoute');
const _AdminManagementRoutes = require('./routes/AdminManagementRoute');
const _UserManagementRoutes = require('./routes/UserManagementRoute');
const _ExamSubscriptionPlanManagementRoute = require('./routes/ExamSubscriptionPlanManagementRoute');
const _PasswordManagementRoute = require('./routes/PasswordManagementRoute');

//*****UsingRoutes*****//
app.use('/QuestionaireManagement',_QuestionaireManagementRoute);
app.use('/AdminManagement',_AdminManagementRoutes);
app.use('/UserManagement',_UserManagementRoutes);
app.use('/ExamSubscriptionPlanManagement',_ExamSubscriptionPlanManagementRoute);
app.use('/PasswordManagement',_PasswordManagementRoute)
app.use(express.static(path.join(__dirname,'/frontend-lms')));
//*****UsingRoutes*****//


//End Block Accessing The Routes in the Entry Point


//Serving Front End Form Your Server.js(Express)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend-lms/index.html'));
})
//Serving Front End Form Your Server.js(Express)


//Start Block Checking Routes As express not found Url not Founded we need to do it explicitly 
app.use((req, res, next) => {
    const error = new Error('Url not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        }
    })
});
//End Block Checking Routes As express not found Url not Founded we need to do it explicitly 

//Start Block For Listening Your App On Defined Port
app.listen(PORT, () => {
    console.log(`Server is Listening/Running on Port ${PORT}`);
    // fs.readFile('./file',"utf8",(error,data) => {
    //     console.log(error);
    //     console.log(data);
    // })
})
//End Block For Listening Your App On Defined Port
