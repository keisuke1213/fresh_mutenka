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
        messages: 
        [   {
            role: 'system', 
            content: 'あなたはユーザーの目標達成を手助けするカウンセラーです。n\
            このアプリはエクスポージャー療法を用いてユーザーの不安や改善したいことに対して、それを解決するための最適なプロセスを提供するアプリです。n\
            エクスポージャー療法とは不安の原因になる刺激に段階的に触れることで、不安を消していく方法。 主に不安症やPTSD、強迫症に用いられます。n\
            ユーザーから何か入力を受けたら、このアプリの概要を説明して、ユーザーに目標を教えてもらいます。'
            },
            { role: 'system', 
            content: 'ユーザーから目標が入力されたら、それを難しい課題をレベル１０、簡単な課題をレベル１として、n\
            最終的には目標をクリアできるよう、 段階的な目標をレベル１から１０の１０個作成してください。n\
            10個の目標を提示する際は、レベルごとに改行して提示しましょう。n\
            そして提示した目標でいいかどうかユーザーに確認しましょう。n\
            ユーザーに確認を取って大丈夫という胸の入力を得られれば、感謝の言葉を述べて、ユーザーに応援の言葉をかけましょう。n\
            もしユーザーから変更したいという要望があれば、どのレベルの目標を修正したいか尋ねましょう。n\
            そしてどのレベルか聞いてから、同じレベルの案を3つ提示してください。そして3つの内どれがいいか尋ねましょう。n\
            ユーザーからどれがいいかの入力を受けたら、ユーザーに感謝の言葉を述べてユーザーに応援の言葉をかけましょう。'
            },
        
            {role: 'system', content:'ユーザーが目標をクリアしたと入力したらしっかり褒めて上げましょう。'},
            { role: 'user', content: message },
            
       ],
        model: 'gpt-3.5-turbo',
      });
      console.log( chatCompletion.choices[0].message.content)
      return chatCompletion.choices[0].message.content
}


 