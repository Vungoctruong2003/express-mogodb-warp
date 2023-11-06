import express from 'express';
import cors from 'cors';
import routes from './src/routes/index.js';
import dotenv from 'dotenv';
import connectToCluster from "./config/db.js";

dotenv.config();

const app = express();

global.sharedMongoClient = await connectToCluster(process.env.MONGO_URI);

app.use(cors());

app.use(express.json())

app.use('/', routes);

// start server
app.listen(4001, () => {
    console.log('listening at port:4001');
});

