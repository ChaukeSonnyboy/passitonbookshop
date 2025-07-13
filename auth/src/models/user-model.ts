import mongoose from "mongoose";

// Interface representing the shape of a User document stored in MongoDB
interface userDoc extends mongoose.Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

// Interface representing the properties required to create a new user (input data)
interface userProps {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

// Interface representing the custom static methods on the User model
interface userModel extends mongoose.Model<userDoc> {
  build(props: userProps): userDoc;
}

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

userSchema.statics.build = (props: userProps) => {
  return new User(props);
};

export const User = mongoose.model<userDoc, userModel>("User", userSchema);
