import bcrypt from "bcrypt";
import User from "@/models/User";
import connectDB from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed",
      message: "Must use POST method",
    });
  }

  const { email, password, firstName, lastName, address } = req.body;

  try {
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: "Please provide the required fields",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    await connectDB();

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      firstName,
      lastName,
      address,
      password: hashedPassword,
    });
    await user.save();
    return res.status(200).json({
      message: "User registered successfully",
      userCreated: user,
    });
  } catch (error) {
    return res.status(500).json({
      error: "User registration failed",
      message: "This is a network error",
    });
  }
}
