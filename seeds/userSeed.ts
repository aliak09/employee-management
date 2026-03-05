import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import bcrypt from "bcryptjs";
import { connectDB } from "../lib/db";
import Employee from "../models/Employee";


async function userRegister() {
    await connectDB();
        const hashedPassword = await bcrypt.hash("admin123", 10);
        const adminExists = await Employee.findOne({email: "admin@company.com"}); 
        if(!adminExists){
            await Employee.create({
                name: "Admin User",
                email: "admin@company.com",
                password: hashedPassword,
                role: "admin"
            });
            console.log("Admin user created!!");    
        } else{
            console.log("Admin already exists");
        }  
    process.exit();
}

userRegister();