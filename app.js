const express = require('express');
const postRoute = require('./routes/posts.js');
const userRoute = require('./routes/user.js');
const imageRoute = require('./routes/image.js');
const bodyParser = require ('body-parser');

const app = express();

app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'));
app.use("/posts", postRoute);
app.use("/user", userRoute);
app.use("/images",imageRoute);
app.get('/',(req,res)=> {
    res.send('hEllo Worllld');
});
module.exports= app;
