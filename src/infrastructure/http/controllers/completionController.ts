import { Request, Response } from 'express';
import { generateCompletion } from '../../../domain/usecases/generateCompletion';
import { callOpenAI } from '../../providers/openai';


export async function handleCompletion(req: Request, res: Response) {
    const { prompt } = req.body;

    const result = await generateCompletion(prompt, callOpenAI)

    res.json({
        ...result,
        prompt: prompt
    });
}
