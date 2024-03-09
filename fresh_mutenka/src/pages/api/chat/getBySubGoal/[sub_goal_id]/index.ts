import { supabase } from "@/utils/supabase/supabase";

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const sub_goal_id = Array.isArray(req.query.sub_goal_id) ? '' : req.query.sub_goal_id ?? ''
    const { data: chats, error } = await supabase.from("chats").select("*").match({ sub_goal_id: sub_goal_id });
    if (error) return error
    res.status(200).json({ chats });
  }