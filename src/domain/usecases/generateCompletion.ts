// domain/usecases/generateCompletion.ts
import { AppError } from '../errors/errors';
import { processPrompt } from '../utils/nlpProcessor';


interface Response {
    productive: boolean,
    response: string
}
type AIProvider = (prompt: string) => Promise<Response>;

export async function generateCompletion(prompt: string, aiProvider: AIProvider): Promise<Response> {
    if (!prompt?.trim()) {
        throw new AppError('Prompt não pode ser vazio');
    }
    const stemmedPrompt = processPrompt(prompt.trim());



    return await aiProvider(stemmedPrompt);
}