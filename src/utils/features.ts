import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as cookie from "cookie";
import mongoose from "mongoose";

export const connectDB = async () => {
  const dbUrl = process.env.MONGO_URL || "";
  await mongoose.connect(dbUrl, { dbName: "NextTodo" });
};

export const generateToken = (_id: mongoose.Schema.Types.ObjectId) => {
  if (_id) {
    return jwt.sign({ _id }, process.env.JWT_SECRET || "");
  } else {
    return null;
  }
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const matchPassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const setCookie = (token: string) => {
  if (token) {
    return cookie.serialize("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 15,
      path: "/",
    });
  } else {
    return cookie.serialize("token", "", {
      httpOnly: true,
      maxAge: 0,
      path: "/",
    });
  }
};
