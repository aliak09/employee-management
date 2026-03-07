import { NextRequest, NextResponse } from "next/server";
import Jwt, {JwtPayload} from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  userId: string;
  role: string;
}

// check if the user is logged in
export function authenticate(req:NextRequest): DecodedToken | null {
    const token = req.cookies.get("authToken")?.value;
    if(!token){
        return null;
    }
    try{
        const decode = Jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
        return decode;
    } catch(err){
        return null;
    }
}