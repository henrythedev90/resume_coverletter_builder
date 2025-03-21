import connectDB from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({
      error: "Method Not Allowed",
      message: "Must use POST method",
    });
  }

  const { email, password, firstName, lastName } = req.body;

  await connectDB();

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new User({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });
    await user.save();
    res.status(200).json({
      message: "User registered successfully",
      userCreated: user,
    });
  } catch (error) {
    res.status(500).json({
      error: "User registration failed",
      message: "This is a network error",
    });
  }
}
