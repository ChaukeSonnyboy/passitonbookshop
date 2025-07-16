import mongoose from "mongoose";
import argon from "argon2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Interface representing the shape of a User document stored in MongoDB
interface userDoc extends mongoose.Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  refreshToken: string;
}

// Interface representing the properties required to create a new user (input data)
interface userProps {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

// Interface representing the custom methods on the User model
interface userModel extends mongoose.Model<userDoc> {
  verifyPassword(password: string): Promise<boolean>;
  build(props: userProps): userDoc;
}

const userSchema = new mongoose.Schema(
  {
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
    refreshToken: {
      type: String,
      trim: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.refreshToken;
        delete ret.__v;
      },
    },
  }
);

//Method to hash the password before saving user info into the db
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const hashedPassword = await argon.hash(this.password);

    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err as Error);
  }
});

//Method to verify the password
userSchema.methods.verifyPassword = async function (
  password: string
): Promise<boolean> {
  try {
    return await argon.verify(password, this.password);
  } catch {
    return false;
  }
};

//Method to create a new user
userSchema.statics.build = (props: userProps) => {
  return new User(props);
};

//Method to generate an access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this.id,
      firstname: this.firstname,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: "1h",
    }
  );
};

//Method to generate a refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      id: this.id,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "1d",
    }
  );
};

export const User = mongoose.model<userDoc, userModel>("User", userSchema);
