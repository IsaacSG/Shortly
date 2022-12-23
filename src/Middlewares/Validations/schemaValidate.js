import schemas from "../../Schemas/schema.js";

export default function schemaValidate(schema) {
    return (req, res, next) => {
        const { error } = schemas[schema].validate(req.body, { abortEarly: false });

        if(error) {
            return res.status(422).send(error);
        }

        next();
    }
}