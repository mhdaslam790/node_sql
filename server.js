import http from 'http';
import app from './app.js';
import 'dotenv/config';

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port,()=> console.log(`Listening at port ${port}`));