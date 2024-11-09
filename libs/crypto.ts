import crypto from "crypto";

export const generateToken = () => crypto.randomBytes(20).toString("hex");

export const generateHashToken = (token: string) =>
  crypto.createHash("sha256").update(token).digest("hex");
