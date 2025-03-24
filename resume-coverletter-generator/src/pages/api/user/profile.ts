import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import connectDB from "@/utils/db";
import User from "@/models/User";
import Resume from "@/models/Resume";
import CoverLetter from "@/models/CoverLetter";

interface DecodedToken {
  userId: string;
  iat: number;
  exp: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT secret is not defined");
    }

    const decoded = jwt.verify(token, jwtSecret) as DecodedToken;
    const userId = decoded.userId;

    await connectDB();

    switch (req.method) {
      case "GET":
        try {
          const user = await User.findById(userId).select("-password");

          if (!user) {
            return res.status(404).json({
              success: false,
              message: "User not found",
            });
          }

          return res.status(200).json({
            success: true,
            data: user,
          });
        } catch (error) {
          console.error("GET Error:", error);
          return res.status(500).json({
            success: false,
            message: "Error fetching profile",
          });
        }

      case "PUT":
        try {
          const { firstName, lastName, email, ...otherUpdates } = req.body;

          if (email) {
            return res.status(400).json({
              success: false,
              message:
                "Email cannot be updated. Please contact support if you need to change your email.",
            });
          }
          // Validate that at least one valid field is being updated
          if (
            !firstName &&
            !lastName &&
            Object.keys(otherUpdates).length === 0
          ) {
            return res.status(400).json({
              success: false,
              message: "No valid fields provided for update",
            });
          }

          // Create updates object with only allowed fields
          const updates = {
            ...(firstName && { firstName }),
            ...(lastName && { lastName }),
          };

          const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true }
          ).select("-password");

          return res.status(200).json({
            success: true,
            data: updatedUser,
            message: "Profile updated successfully",
          });
        } catch (error) {
          console.error("PUT Error:", error);
          return res.status(500).json({
            success: false,
            message: "Error updating profile",
          });
        }

      case "DELETE":
        try {
          await User.findByIdAndDelete(userId);

          await Resume.findByIdAndDelete(userId);

          await CoverLetter.findByIdAndDelete(userId);

          return res.status(200).json({
            success: true,
            message: "Profile deleted successfully",
          });
        } catch (error) {
          console.error("DELETE Error:", error);
          return res.status(500).json({
            success: false,
            message: "Error deleting profile",
          });
        }

      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        return res.status(405).json({
          success: false,
          message: `Method ${req.method} Not Allowed`,
        });
    }
  } catch (error) {
    console.error("Token verification error:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
