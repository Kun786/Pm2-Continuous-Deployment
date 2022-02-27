const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname,'/static')));

app.get('*',(req, res) => {
    res.sendFile(path.join(__dirname+'/static/index.html'))
})
app.listen(1234,() => {
    console.log('App is running on port 1234');
})