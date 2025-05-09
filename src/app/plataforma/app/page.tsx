import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { RedirectType } from "next/navigation";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {UserNav} from "@/components/commom/user-nav"

export default async function userApp(){
    let loggedIn = false;
    try {
        const supabase = createServerComponentClient({cookies});
        const {
            data: {session},
        } = await supabase.auth.getSession();

        if(session) loggedIn = true;

    } catch (error) {
        console.log("UserApp",error);
    }finally{
        if (!loggedIn) redirect("/", RedirectType.replace);
    }
    return (
    
    <>
    <UserNav/>
    </>
    
    )

    
}