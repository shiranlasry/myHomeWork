//user middeleware

import { UserModel } from "../userModel";


import jwt from 'jwt-simple';



export function isAdmin(req, res, next) {
  try {
    //take from cookie and decode cookie and check for admin role
    const token = req.cookies.user;
    const { SECRET: secret } = process.env;
   
    if (!token) throw new Error("no token");
    const cookie = jwt.decode(token, secret);
    //decoded cookie
    const { role } = cookie;
    req.role = role;
    if (role !== "admin") throw new Error("no admin");
    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
}

export async function getLoggedUser(req: any, res: any, next: Function) {
  try {

    const { SECRET: secret } = process.env;
  

    const token = req.cookies.user;
    
    if (!token) {
      req.user = null;
      return next(); // Don't forget to call next() when there's no token
    }

    if (!secret) throw new Error("no secret");

    const cookie = jwt.decode(token, secret);
   
    const { uid } = cookie;
    
    const userDB = await UserModel.findById(uid);

    if (!userDB) {
      req.user = null;
    } else {
      req.user = userDB;
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
}
