import express from 'express';
import postRoute from './routes/posts.js';
import 'dotenv/config';

const app = express();

app.use("/posts", postRoute);
app.get('/',(req,res)=> {
    res.send('hEllo Worllld');
});
export default app;
