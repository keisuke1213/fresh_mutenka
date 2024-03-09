import { supabase } from "@/utils/supabase/supabase";

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log('achievementSubGoal')
    const sub_goal_id = Array.isArray(req.query.sub_goal_id) ? '' : req.query.sub_goal_id ?? ''
    const { error } = await supabase
        .from("sub_goals")
        .update({is_now: true})
        .match({id: sub_goal_id})
        .select();
    if (error) return error
    res.status(200).json({ response: "ok" });
  }