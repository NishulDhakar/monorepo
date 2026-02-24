import jwt from "jsonwebtoken"
import { ENV } from "../config/env.js"


export const generateToken = (userId : string) => {

   return jwt.sign({ userId }, ENV.JWT_SECRET, { expiresIn: "7d" })

}

export const verifyToken = (token : string) => {

    return jwt.verify(token ,ENV.JWT_SECRET )
}
