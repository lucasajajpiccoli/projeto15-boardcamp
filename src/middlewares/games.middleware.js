import { gamesSchema } from '../schemas/games.schema.js';
import { connection } from '../db/database.js';
import { TABLES } from '../enums/tables.js';
import { STATUS_CODE } from '../enums/statusCode.js';

async function gamesMiddleware(req, res, next) {
    const validation = gamesSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(STATUS_CODE.BAD_REQUEST).send(errors);
    }

    try {
        const { body } = req;
        const game = (await connection.query(`
            SELECT * FROM ${TABLES.GAMES} WHERE name = $1;
        `, [body.name])).rows;
        if (game[0]) { return res.sendStatus(STATUS_CODE.CONFLICT) }

        res.locals.body = body;
        next();
    } catch (error) {
        res.status(STATUS_CODE.SERVER_ERROR).send(error);
    }
}

export { gamesMiddleware };