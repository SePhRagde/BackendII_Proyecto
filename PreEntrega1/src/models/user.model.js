import mongoose, { Schema, model, mongo } from "mongoose"

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart "},
    password: { type: String, required: true },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user"],
        default: "user",
    },
});

userSchema.pre("save", async function (next) {
    if (this.email.includes("@") && this.email.includes(".")) {
        return next();
    }

    next(new Error("Email is not valid"));
});

export const userModel = model("user", userSchema);