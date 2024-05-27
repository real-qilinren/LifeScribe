import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    picturePath: {
        type: String,
        default: "",
    },
    friends: {
        type: Array,
        default: [],
    },
    location: {
        type: String,
        max: 50,
    },
    occupation: {
        type: String,
        max: 50,
    },
    viewedProfile: Number,
    impressions: Number,
}, { timestamps: true });

// q: what is the difference between the two lines below?
// a: the first line is a named export, the second line is a default export
// export default mongoose.model("User", userSchema);
const User = mongoose.model("User", userSchema);
export default User;