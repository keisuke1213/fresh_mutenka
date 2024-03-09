import { supabase } from "@/utils/supabase/supabase";

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const userId = Array.isArray(req.query.user_id) ? '' : req.query.user_id ?? ''
    console.log(userId)
    const { error } = await supabase
        .from("goals")
        .insert({user_id: userId });
    if (error) return error
    res.status(200).json({ response: "ok" });
  }