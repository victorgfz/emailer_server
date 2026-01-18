import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './infrastructure/http/routes';
import { errorHandler } from './infrastructure/http/middlewares/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares

// app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.json());
app.use("/api", router);
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});