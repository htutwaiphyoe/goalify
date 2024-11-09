import { NextApiRequest } from "next";

export interface IUserRequest extends NextApiRequest {
  user: any;
}
