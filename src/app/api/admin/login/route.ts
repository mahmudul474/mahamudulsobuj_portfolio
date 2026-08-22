import {NextResponse} from "next/server";import {login} from "@/lib/auth";
export async function POST(req:Request){const b=await req.json();if(b.email===process.env.ADMIN_EMAIL&&b.password===process.env.ADMIN_PASSWORD){await login();return NextResponse.json({ok:true})}return NextResponse.json({error:"Invalid"},{status:401})}
