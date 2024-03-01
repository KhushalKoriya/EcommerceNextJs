import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, "Email is required!"],
		trim: true,
	},
	username: {
		type: String,
		required: [true, "Name is required!"],
		trim: true,
	},
    password: { 
        type: String, 
        required: [true, "Password is required!"],
        trim: true, 
    },
    confirmPassword: { 
        type: String, 
        required: [true, "Confirm-Password is required!"],
        trim: true, 
    },
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
