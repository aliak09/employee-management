import mongoose from "mongoose";

const employeeSchema=new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    role:{type:String, enum:['admin', 'employee'], required:true},
    profileImage:{type:String}
}, {timestamps:true});

export default mongoose.models.Employee || mongoose.model('Employee', employeeSchema);
