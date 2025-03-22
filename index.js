import express from "express";
import mongoDBconnect from './configs/mongodb.js';
import Cloudinaryconnect from './configs/CloudeinaryDB.js';
import authRouter from './routes/userroutes.js';
import productRouter from './routes/ProductRoute.js';
import cors from "cors";
import dotenv from 'dotenv'; // Fixed incorrect casing (Dotenv → dotenv)
import bodyParser from 'body-parser'; // Fixed incorrect casing (BodyParser → bodyParser)

dotenv.config(); // Move this to the top to load environment variables early

const app = express();
const port = process.env.PORT || 5000; // Default port if env variable is missing

// Middleware
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json()); // Body parsing middleware
app.use(bodyParser.json());

// Connect to MongoDB & Cloudinary
mongoDBconnect();
Cloudinaryconnect();

// API Routes
app.use('/api/user', authRouter);
app.use('/api/product', productRouter);

// Error Handling Middleware (Prevents 500 errors from crashing the server)
app.use((err, req, res, next) => {
    console.error("Server Error:", err.message);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Start the Server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
