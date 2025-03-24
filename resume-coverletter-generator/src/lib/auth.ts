import jwt from "jsonwebtoken";

export const verifyJWT = (token: any) => {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT secret is not defined");
    }
    const decode = jwt.verify(token, jwtSecret);
    return decode;
  } catch (error) {
    return null;
  }
};
