import mongoose from "mongoose";

const employeeSchema=new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    role:{type:String, enum:['admin', 'employee'], required:true},
    profileImage:{type:String},
    employeeId:{type:String, required:true, unique:true},
    dob: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    maritalStatus: { type: String, enum: ['single', 'married'] },
    designation: { type: String },
    department: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required:true 
    },
    salary: { type: Number }
}, {timestamps:true});

export default mongoose.models.Employee || mongoose.model('Employee', employeeSchema);
