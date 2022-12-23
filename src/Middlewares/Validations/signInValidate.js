import bcrypt from "bcrypt";
import { emailVerify } from "../../Repositories/authRepository.js";

export default async function signInVerify(req, res, next) {
    const { rows: checkEmail } = await emailVerify(req.body.email);
    
    if(checkEmail.length === 0) {
        return res.status(401).send("Email invalid");

    } 
    else if(!bcrypt.compareSync(req.body.password, checkEmail[0].password)) {
        return res.status(401).send("Password invalid");
    }

    res.locals.user = checkEmail[0];

    next();
}