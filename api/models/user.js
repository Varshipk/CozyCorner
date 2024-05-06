import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        default:"https://th.bing.com/th/id/OIP.CnUDQJgi-4x5EG3EXmvZhAHaHa?w=194&h=195&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    },
    },{timestamps:true})

    const User =mongoose.model('User',userSchema);
    export default User;
