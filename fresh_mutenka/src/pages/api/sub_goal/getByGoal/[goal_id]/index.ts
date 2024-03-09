import { supabase } from "@/utils/supabase/supabase";

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const goal_id = Array.isArray(req.query.goal_id) ? '' : req.query.goal_id ?? ''
    const { data: goals, error } = await supabase.from("sub_goals").select("*").match({ goal_id: goal_id }).order("level");
    if (error) return error
    res.status(200).json({ goals });
  }