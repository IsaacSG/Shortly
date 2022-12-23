import { Router } from "express";
import { signIn, getUserUrls, signUpM } from "../Controllers/authController.js";
import schemaValidate from "../Middlewares/Validations/schemaValidate.js";
import signInValidate from "../Middlewares/Validations/signInValidate.js";
import signUpValidate from "../Middlewares/Validations/signUpValidate.js";
import tokenVerify from "../Middlewares/tokenVerify.js";

const router = Router();

router.post("/signup", schemaValidate("signUp"), signUpValidate, signUpM);
router.post("/signin", schemaValidate("signIn"), signInValidate, signIn);
router.get("/users/me", tokenVerify, getUserUrls);

export default router;