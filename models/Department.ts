import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    name:{
        type: String, 
        unique:true, 
        trim:true, 
        required: true 
    },
    description:{
        type: String, 
        trim:true
    }
}, {timestamps:true});

export default mongoose.models.Department || mongoose.model("Department", departmentSchema);