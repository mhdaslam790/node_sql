const express = require('express');
const postRoute = require('./routes/posts.js');
const bodyParser = require ('body-parser');


const app = express();

app.use(bodyParser.json());
app.use("/posts", postRoute);
app.get('/',(req,res)=> {
    res.send('hEllo Worllld');
});
 module.exports= app;
