import { Types } from "mongoose";

export interface User {
  _id: Types.ObjectId;
  email: string;
  address?: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt?: Date;
  updatedAt?: Date;
}
