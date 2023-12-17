import express from "express";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";
import UserModel, { UserValidation } from "./userModel";

const saltRounds = 10;

export async function register(req: express.Request, res: express.Response) {
    try {
        const { email, username, password, password2,city,street,houseNumber,apartmentNumber} = req.body;

        if (!email || !username || !password || !password2 || !city|| !street || !houseNumber|| !apartmentNumber) throw new Error("Couldn't get all fields from req.body");

        const { error } = UserValidation.validate({ email, username, password, password2 , city, street, houseNumber, apartmentNumber});
        if (error) throw error;
  
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
  
        const userDB = new UserModel({ email, username, password: hash , city, street, houseNumber, apartmentNumber});
        await userDB.save();
  
        //sending cookie
        if (userDB) {
            res.send({ register: true, userDB });
        } else {
            res.send({ register: false });
        }
  
    } catch (error) {
        res.send({ error: error.message });
    }
  }

  export async function login(req: express.Request, res: express.Response) {
    try {
        const { email, password } = req.body;
        if (!email || !password) throw new Error("Couldn't get all fields from req.body");
  
        const userDB = await UserModel.findOne({ email });
        if (!userDB) throw new Error("User not found");
  
        const match = bcrypt.compareSync(password, userDB.password);
        if (!match) throw new Error("Wrong password");
  
        //sending cookie
        const cookie = { userId: userDB._id }
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error("Couldn't load secret from .env");
  
        const JWTCookie = jwt.encode(cookie, secret);
  
        if (userDB) {
            res.cookie("userID", JWTCookie);
            res.send({ login: true, userDB });
        } else {
            res.send({ login: false });
        }
  
    } catch (error) {
        res.send({ error: error.message });
    }
  }