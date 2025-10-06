import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "email is already registerd"],
      required: [true, "email is required"],
    },
    username: {
      type: String,

      required: [true, "username is required"],
    },
    image: {
      type: String,
    },
    bookmarks: {
      type: Schema.Types.ObjectId,
      ref: "property",
    },
  },
  { timestamps: true },
);

const User = models.User || model("User", userSchema);
export default User;
