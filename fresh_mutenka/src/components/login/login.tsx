'use client'
import Image from "next/image";
import { supabase } from "@/utils/supabase/supabase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type LoginProps = {
    session:any
}

export default function Login(props: LoginProps) {
    const { session } = props
    const route = useRouter()
    const handleLogout = async () => {
        await supabase.auth.signOut()
        route.push('/')
        
      }
    const handleSocialLogin = async (prov: any) => {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: prov,
          options: {
            queryParams: {
              access_type: 'offline',
              prompt: 'consent',
            },
          },
        })
        if (error) {
          console.log(error);
          return
        }
        
        
      }
    useEffect(() => {
        if (session) {
            route.push("/home")
        }
    })
    return(<div>

        <button onClick={() => handleSocialLogin('google')} ><Image src={"/web_light_rd_SI@3x.png"} alt={"google"} width={400} height={100} /> </button>
        <button onClick={handleLogout}>logout</button>
        </div>)
}