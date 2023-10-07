import express  from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postroutes from './routes/postroutes.js';
import dalleroutes from './routes/dalleroutes.js';

const path= import('path');
dotenv.config();


const app= express();
app.use(cors());
app.use(express.json({limit: '50mb'}));

app.use('/api/v1/post' , postroutes);
app.use('/api/v1/dalle' , dalleroutes);

app.use(express.static(path.join(__dirname, './client/dist')));


app.get('*', async (req,res) => {
    res.sendFile(path.join(__dirname , './client/dist/index.html'));
});

const startServer = async () => {
    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server has started on port http://localhost:8080'))
    }catch(error) {
        console.log(error);
    }


    
}

startServer();

