import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";


export async function POST(req:NextRequest) {
    try{

        const formData = await req.formData();
        const file = formData.get("image") as File;

        if(!file) {
            return NextResponse.json({error: "No file uploaded"}, {status:400});
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result: any = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream({ folder: "employees" }, (err, result) => {
                if (err) reject(err);
                else resolve(result);
                })
                .end(buffer);
        }); 

        return NextResponse.json({
        url: result.secure_url,
        });

    }catch(error:any){
      
        return NextResponse.json(
        { error: error.message },
        { status: 500 }
        
        );
    }
}