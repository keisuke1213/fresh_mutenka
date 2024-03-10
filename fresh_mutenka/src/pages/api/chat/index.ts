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
            ユーザーから何か入力を受けたら、このアプリの概要とエクスポージャー療法を説明して、ユーザーに目標を尋ねます。'
            },
            { role: 'system', 
            content: 'ユーザーから目標が入力されたら、それを難しい課題をレベル100、簡単な課題をレベル10として、n\
            最終的には目標をクリアできるよう、 段階的な目標をレベル10から100の10個作成してください。その時、[n\
                ```jsonn\
            [n\
                { "level": 10, "goal": "深呼吸をしながら、高い場所の写真を見る" },n\
                { "level": 20, "goal": "ビルの上層階から景色を見る" },n\
                { "level": 30, "goal": "エスカレーターやエレベーターを使ってみる" },n\
                { "level": 40, "goal": "観覧車に乗る" },n\
                { "level": 50, "goal": "ビルの屋上や展望台に立ってみる" },n\
                { "level": 60, "goal": "山登りをしてみる" },n\
                { "level": 70, "goal": "ジェットコースターやフリーフォールなどの高い遊園地の乗り物に乗る" },n\
                { "level": 80, "goal": "スカイダイビングのVR体験をする" },n\
                { "level": 90, "goal": "飛行機に乗る" },n\
                { "level": 100, "goal": "自信を持って高所を経験する" }n\
            ]n\
            ```n\
            n\
            のようにjson形式で出力してください}n\
            のようにjson形式で出力してくださいユーザーの入力が目標かどうか区別して。n\
            ユーザーからこれでいいという返信を受けたら、感謝の言葉を述べて、ユーザーに応援の言葉をかけましょう。n\
            もしユーザーから変更したいという要望があれば、どのレベルの目標を修正したいか尋ねましょう。n\
            そしてどのレベルの修正をしたいかの入力を受けたら、同じレベルの案かつ最初のユーザーが入力した目標に沿った案を3つ提示してください。そして3つの内どれがいいか尋ねましょう。n\
            ユーザーから何個目の案がいいかの入力を受けたら、ユーザーに感謝の言葉を述べてユーザーに応援の言葉をかけましょう。'
            },
            
            {role: 'system', content:'ユーザーが目標をクリアしたと入力したらしっかり褒めて上げましょう。'},
            { role: 'user', content: message },
            
       ],
        model: 'gpt-3.5-turbo',
      });
      console.log( chatCompletion.choices[0].message.content)
      return chatCompletion.choices[0].message.content
}


 