import express from 'express';
import { handleCompletion } from '../controllers/completionController';
import { asyncHandler } from '../middlewares/asyncHandler';
import { extractTextFromFile, uploadFile } from '../middlewares/fileHandler';

export const router = express.Router();

router.post('/', uploadFile, extractTextFromFile, asyncHandler(handleCompletion));

