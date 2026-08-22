import {cookies} from "next/headers";
export async function admin(){return (await cookies()).get("admin")?.value==="1"}
export async function login(){(await cookies()).set("admin","1",{httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production",path:"/"})}
