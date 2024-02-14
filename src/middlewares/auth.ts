import * as jwt from "jsonwebtoken";
import mongoose from "mongoose";

interface jwtPayload {
  _id: mongoose.Schema.Types.ObjectId;
}

export const checkToken = (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as jwtPayload;
  return decoded._id;
};
