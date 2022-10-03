import { categorySchema } from '../schemas/categories.schema.js';
import { connection } from '../db/database.js';
import { TABLES } from '../enums/tables.js';
import { STATUS_CODE } from '../enums/statusCode.js';

async function categoriesMiddleware(req, res, next) {
    const name = req.body?.name;
    if (!name) { return res.sendStatus(STATUS_CODE.BAD_REQUEST) }

    const validation = categorySchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(errors);
    }

    try {
        const category = (await connection.query(
            `SELECT * FROM ${TABLES.CATEGORIES} WHERE name = $1;`,
        [name])).rows;
        if (category[0]) { return res.sendStatus(STATUS_CODE.CONFLICT) }

        res.locals.name = name;
        next();
    } catch (error) {
        res.status(STATUS_CODE.SERVER_ERROR).send(error);
    }
}

export { categoriesMiddleware };