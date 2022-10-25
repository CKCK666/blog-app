import express from 'express';

import cors from 'cors';
import connectDB from './config/connection.js';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import postsRoutes from "./routes/postsRoutes.js"
import categoryRoutes from './routes/categoryRoutes.js';
import uploadRoutes from "./routes/uploadRoutes.js"
import dotenv from "dotenv"
import path from 'path';
import {fileURLToPath} from 'url';

// const __filename = fileURLToPath(import.meta.url);


// const __dirname = path.dirname(__filename);


dotenv.config()
const app = express();
connectDB();
app.use(cors());
// app.use("/images",express.static(path.join(__dirname+"/images")))

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

//auth route
app.use('/api/auth', authRoutes);

//users route
app.use('/api/users', userRoutes);

//posts route
app.use("/api/posts",postsRoutes)


//categories route
app.use("/api/categories",categoryRoutes)

//upload route
app.use("/api/upload",uploadRoutes)

const __dirname=path.resolve()
app.use("/images",express.static(path.join(__dirname,"/images")))



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running on port ${PORT}`));
