import { supabase } from "@/utils/supabase/supabase";

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const goal_id = Array.isArray(req.query.goal_id) ? '' : req.query.goal_id ?? ''
    const level = Array.isArray(req.query.level) ? '' : req.query.level ?? ''
    const content = Array.isArray(req.query.content) ? '' : req.query.content ?? ''
    const { error } = await supabase
        .from("sub_goals")
        .insert({goal_id: goal_id, level: Number(level), content: content });
    if (error) return error
    res.status(200).json({ response: "ok" });
  }