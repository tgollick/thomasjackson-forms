import argon2 from "argon2";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-very-secure-secret";

export async function hashPassword(plainPassword: string): Promise<string> {
  return await argon2.hash(plainPassword);
}

export async function verifyPassword(
  hash: string,
  plainPassword: string
): Promise<boolean> {
  // `hash` here is the hashed password from your database.
  return await argon2.verify(hash, plainPassword);
}

export function createToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch (error) {
    return null;
  }
}
