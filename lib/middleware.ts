//important 
//not applied middleware anywhere for now but w'll see if we can use this later on
//right now we are relying on authentication from lib/auth.ts

import { NextResponse, NextRequest } from "next/server";
import { verify } from "jsonwebtoken";

export function requireAuth(req:NextRequest, role?:string){
    
    const authHeader = req.headers.get("authorization");
    
    if(!authHeader) return null;

    const token=authHeader.split(" ")[1]; //authHeader = bearer <token>

    try{
        const decode:any = verify (token, process.env.JWT_SECRET!);
        
        if(role && decode.role !==role) return null;

        return decode;
    }catch(err){
        return null;
    }

}
