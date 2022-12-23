import { Router } from "express";
import { accessShortenLink, createShortenUrl, deleteShortenUrl, getRanking, getShortenUrl } from "../Controllers/urlsController.js"
import verifyToken from "../Middlewares/tokenVerify.js";
import validateShortenUrl from "../Middlewares/Validations/urlsValidate.js";
import validateSchema from "../Middlewares/Validations/schemaValidate.js";

const router = Router()

router.post("/urls/shorten", verifyToken, validateSchema("shortenUrl"), validateShortenUrl, createShortenUrl)
router.get("/urls/:shortenId", getShortenUrl)
router.get("/urls/open/:shortUrl", accessShortenLink)
router.delete("/urls/:shortenId", verifyToken, deleteShortenUrl)
router.get("/ranking", getRanking)

export default router