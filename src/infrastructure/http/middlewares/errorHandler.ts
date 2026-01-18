
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../../domain/errors/errors';

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    console.error('Error:', error.message);

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            error: error.message
        });
    }

    res.status(500).json({
        error: 'Internal server error'
    });
}
