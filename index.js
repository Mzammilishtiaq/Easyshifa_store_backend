import express from "express";
import mongoDBconnect from './configs/mongodb.js';
import Cloudinaryconnect from './configs/CloudeinaryDB.js';
import authRouter from './routes/userroutes.js';
import productRouter from './routes/ProductRoute.js';
import cors from 'cors';
import Dotenv from 'dotenv';
import BodyParser from 'body-parser'
const port = process.env.PORT || 5000
const app = express();
app.use(express.json())


app.use('/api/user', authRouter)
app.use('/api/product', productRouter)

const corsOptions = {
    origin: ["http://localhost:8000"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
};

Dotenv.config();
app.use(cors(corsOptions));
app.use(BodyParser.json());
// mongodb connect
mongoDBconnect();
//cloudeinary connect
Cloudinaryconnect();
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});