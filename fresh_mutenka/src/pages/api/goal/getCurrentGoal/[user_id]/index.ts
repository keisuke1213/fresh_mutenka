import { supabase } from "@/utils/supabase/supabase";

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user_id = Array.isArray(req.query.user_id) ? '' : req.query.user_id ?? ''
    const { data: goals, error } = await supabase.from("goals").select("*").match({ user_id: user_id, is_achievement: false });
    if (error) return error
    res.status(200).json({ goals });
  }