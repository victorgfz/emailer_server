// infrastructure/http/middlewares/fileHandler.ts
import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import { PDFParse } from 'pdf-parse'
import { AppError } from '../../../domain/errors/errors';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['application/pdf', 'text/plain'];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new AppError('Only PDF and TXT files are allowed', 400));
        }
    },
});

export async function extractTextFromFile(req: Request, res: Response, next: NextFunction) {
    try {


        if (!req.file) {
            return next();
        }
        const { buffer, mimetype } = req.file;
        let extractedText = '';

        if (mimetype === 'application/pdf') {
            const parser = new PDFParse({ data: buffer });
            const result = await parser.getText();
            extractedText = result.text;
        } else if (mimetype === 'text/plain') {
            extractedText = buffer.toString('utf-8');
        }

        if (!extractedText || extractedText.trim().length === 0) {
            throw new AppError('The file is blank!', 400);
        }

        req.body.prompt = extractedText;

        next();
    } catch (error) {
        next(error);
    }
}

export const uploadFile = upload.single('file');