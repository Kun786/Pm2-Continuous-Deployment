const Package = require('../package.json');
const mongoose = require('mongoose');

const DatabaseName = 'LMSUpworkProject';
mongoose.connect("mongodb+srv://lms1:lms1@clusterlms.1xyuk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, (error,connection) => {
    if (!error) {
        console.log(`\nMogoDb Connected Successfuly at MongoAtlas with Database Name ${DatabaseName}\n`);
        console.log("Your App Has the Following Dependicies\n");
        for (dependencies in Package.dependencies) {
            console.log(dependencies);
        }
    }
    else { console.log('Error: Not Connected to the MongoDb' + error) }
});

// mongodb+srv://lms1:lms1@clusterlms.1xyuk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority