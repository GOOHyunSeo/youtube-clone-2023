import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String },
});

userSchema.pre("save", async function () {
  console.log("PW", this.password);
  this.password = await bcrypt.hash(this.password, 5);
  console.log("hashed", this.password);
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
