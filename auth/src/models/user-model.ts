import mongoose from "mongoose";
import argon from "argon2";
import { NextFunction } from "express";

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
  verifyPassword(password: string): Promise<boolean>;
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const hashedPassword = await argon.hash("password");

    this.password = hashedPassword;
  } catch (err) {
    next();
  }
});

userSchema.methods.verifyPassword = async function (
  password: string
): Promise<boolean> {
  try {
    return await argon.verify(password, this.password);
  } catch {
    return false;
  }
};

userSchema.statics.build = (props: userProps) => {
  return new User(props);
};

export const User = mongoose.model<userDoc, userModel>("User", userSchema);
