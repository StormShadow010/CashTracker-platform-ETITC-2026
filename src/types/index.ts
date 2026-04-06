import { Request } from "express";

export interface IUserPayload {
  id: string;
  role: "user" | "admin";
}

export interface AuthRequest extends Request {
  user?: IUserPayload;
}

export type UserRole = "user" | "admin";
