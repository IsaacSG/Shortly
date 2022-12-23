import { signInSchema, signUpSchema } from "./authSchema.js";
import { urlSchema } from "./urlsSchema.js";


const schemas = {
    "signIn": signInSchema,
    "signUp": signUpSchema,
    "shortenUrl": urlSchema
};

export default schemas;