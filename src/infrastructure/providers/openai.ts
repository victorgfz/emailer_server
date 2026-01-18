import OpenAI from "openai";
import { AppError } from '../../domain/errors/errors';
import dotenv from "dotenv";

dotenv.config();


interface Response {
    productive: boolean,
    response: string
}

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


export async function callOpenAI(prompt: string): Promise<Response> {

    const response = await client.responses.create({
        model: "gpt-4.1-mini",
        input: `Classifique o email como Produtivo (trabalho) ou Improdutivo (pessoal, propaganda, felicitações)
    Retorne apenas JSON:
        {
        "productive": "um booleano",
        "response": "resposta curta ao email de acordo com a categoria"
        }
        Email: ${prompt}`
    });

    if (!response.output_text) {
        throw new AppError('Error on OpenAI', 502);
    }

    const result = JSON.parse(response.output_text.slice(7, -3));

    if (result.productive === undefined || !result.response) {
        throw new AppError('Invalid JSON format', 502);
    }

    return result as Response;
}