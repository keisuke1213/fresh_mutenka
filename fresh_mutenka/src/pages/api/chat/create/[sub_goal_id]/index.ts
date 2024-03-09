import { supabase } from "@/utils/supabase/supabase";

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const subGoalId = Array.isArray(req.query.sub_goal_id) ? '' : req.query.sub_goal_id ?? ''
    const { error } = await supabase
        .from("chats")
        .insert({sub_goal_id: subGoalId });
    if (error) return error
    res.status(200).json({ response: "ok" });
  }