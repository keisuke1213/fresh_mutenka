import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from "openai";
import Chat from '@/components/home/chat/chat';

const openai = new OpenAI(
    {
        apiKey: process.env['NEXT_PUBLIC_OPENAI_API_KEY'],
        dangerouslyAllowBrowser: true 
    }
);



export async function getResponse(message: string) {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: message }],
        model: 'gpt-3.5-turbo',
      });
      console.log( chatCompletion.choices[0].message.content)
      return chatCompletion.choices[0].message.content
}
 