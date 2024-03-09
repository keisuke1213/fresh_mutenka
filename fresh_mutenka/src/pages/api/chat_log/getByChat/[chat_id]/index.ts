import { supabase } from "@/utils/supabase/supabase";

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const chat_id = Array.isArray(req.query.chat_id) ? '' : req.query.chat_id ?? ''
    const { data: chat_logs, error } = await supabase.from("chat_logs").select("*").match({ chat_id: chat_id });
    if (error) return error
    res.status(200).json({ chat_logs });
  }