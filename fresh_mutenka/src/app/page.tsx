
import { Session, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { supabase } from "@/utils/supabase/supabase";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { cookies } from 'next/headers';
import Login from '@/components/login/loginScreen';

export default async function Page() {
  const supabase = createServerComponentClient({ cookies })

    const {
        data: { session },
    } = await supabase.auth.getSession()

  console.log(session)
  
    

    return (
      <Login session={session} />
    )
}
  
  // if (Session) {
  //   route.push("/home")
  // }
  // console.log(pathname)
  

