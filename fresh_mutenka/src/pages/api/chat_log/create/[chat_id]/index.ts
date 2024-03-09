import { supabase } from "@/utils/supabase/supabase";

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const chatId = Array.isArray(req.query.chat_id) ? '' : req.query.chat_id ?? ''
    const { error } = await supabase
        .from("chat_logs")
        .insert({chat_id: chatId });
    if (error) return error
    res.status(200).json({ response: "ok" });
  }