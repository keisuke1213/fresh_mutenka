import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from "openai";
import Chat from '@/components/home/chat/chat';

const openai = new OpenAI(
    {
        apiKey: process.env['NEXT_PUBLIC_OPENAI_API_KEY'],
        dangerouslyAllowBrowser: true 
    }
);



export async function getResponse() {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: 'Say this is a test' }],
        model: 'gpt-3.5-turbo',
      });
      console.log( chatCompletion )
      return chatCompletion.choices[0].message.content
}
 