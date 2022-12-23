import { urlVerify } from "../../Repositories/urlsRepository.js";

async function validateShortenUrl(req, res, next) {
    const { user } = res.locals;

    const { rowCount: urlFounded } = await urlVerify(req.body.url, user.id);

    if(urlFounded > 0) {
        return res.status(409).send('url already registered')
    }

    next()
}

export default validateShortenUrl