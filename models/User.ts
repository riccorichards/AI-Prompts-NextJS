import mongoose, { model, Schema, models } from "mongoose";

export interface UserType {
  id: mongoose.Schema.Types.ObjectId;
  email: string;
  username: string;
  image: string;
}

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email is already existing"],
    require: [true, "Email is requeired"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
  },
  image: { type: String },
});

const User = models.User || model("User", UserSchema);

export default User;
