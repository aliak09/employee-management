import mongoose from "mongoose";

// cached variable created to avoid multiple connections
let cached=(global as any).mongoose;
if(!cached){
  cached=(global as any).mongoose = {conn: null, promise: null};
}

export async function connectDB() {
  
  const MONGO_URI=process.env.MONGO_URI!;
  if(!MONGO_URI){
        throw new Error("Please define MONGO_URI in .env.local!");
    };
  
  if(cached.conn) return cached.conn;
  
  if(!cached.promise){
    cached.promise= mongoose.connect(MONGO_URI).then((mongoose)=>{
        console.log("MongoDB Connected");
        return mongoose;
    });
  }; 

  cached.conn= await cached.promise;
  return cached.conn;
};