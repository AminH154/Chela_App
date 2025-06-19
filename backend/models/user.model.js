import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        profilePic: {
            type: String,
            default: "",
        },
        bio : {
            type :String,
            default:"",

        },
    },
    { timestamps: true }
);
const PendingUserSchema = new mongoose.Schema({ email: String,
  code: String,
  userData: Object, // ou détaille les champs nécessaires
  codeExpires: Date,
});

export const User = mongoose.model("User",userSchema);
export const PendingUser = mongoose.model("PendingUser", PendingUserSchema);
