import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { profileRouter } from './routes/profile';
import { roadmapRouter } from './routes/roadmap';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001

const allowedOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(",")
    : ["http://localhost:5173"];

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    }),
);

app.use(cookieParser());
app.use(express.json());

//Api Routes
app.use("/api/profile", profileRouter)
app.use("/api/roadmap", roadmapRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})