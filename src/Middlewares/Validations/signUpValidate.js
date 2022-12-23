import { emailVerify } from "../../Repositories/authRepository.js";

export default async function validateSignUp(req, res, next) {
    
    const { rowCount: checkEmail } = await emailVerify(req.body.email);

    if(checkEmail > 0) {
        return res.sendStatus(409);
    }

    next();
}