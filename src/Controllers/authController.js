import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { emailVerify, signUp, userUrls  } from "../Repositories/authRepository.js";

dotenv.config();

export async function signUpM(req, res) {
    const body = req.body;
    delete body.confirmPassword;

    try {
        const hashPassword = bcrypt.hashSync(body.password, 10);

        await signUp(body.name, body.email, hashPassword);

        res.status(201).send("New user created");
    }
    catch (error) {
        console.log(error);
    }
}

export async function signIn(req, res) {
    const { user } = res.locals;

    try {
        const token = jwt.sign(user, process.env.SECRET_KEY, {expiresIn: '3d'})

        res.status(200).send({name: user.name, token})
    }
    catch(error) {
        console.log(error);
    }
}

export async function getUserUrls(req, res) {
    const { user } = res.locals;

    try {
        const { rowCount: emailExist } = await emailVerify(user.email);

        if( emailExist === 0) {
            return res.status(401).send("User not exist");
        }

        const { row: urls } = await userUrls(user.id);
        res.status(200).send(urls[0]);
    }
    catch(error) {
        console.log(error);
    }
}