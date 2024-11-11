const mongoose = require("mongoose")
const userSchema = mongoose.Schema(
    {
        username:{
            type: String,
            required: [true, "Please Enter your name:"]
        },
        firstname:{
            type: String,
            required: [true, "Please Enter your Firstname:"]  
        },
        surname:{
            type: String,
            required: [true, "Please Enter your Surname:"]  
        },
        age:{
            type: Number,
            required: [true, "Please Enter your age:"],
        },
        email:{
            type: String,
            required: [true, "Please Enter your email:"],
        },
        phone:{
            type: Number,
            required: [true, "Please Enter your Phone Number:"],
        }
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model("User",userSchema);
module.exports= User;