import { connection } from '../db/database.js';
import { TABLES } from '../enums/tables.js';
import { STATUS_CODE } from '../enums/statusCode.js';

async function readGames(req, res) {
    const { name } = req.query;
    const search = name ? `
        WHERE ${TABLES.GAMES}.name ILIKE '${name}%';
    ` : `;`;

    try {
        const games = (await connection.query(`
            SELECT
                ${TABLES.GAMES}.id,
                ${TABLES.GAMES}.name,
                ${TABLES.GAMES}.image,
                ${TABLES.GAMES}."stockTotal",
                ${TABLES.GAMES}."categoryId",
                ${TABLES.GAMES}."pricePerDay",
                ${TABLES.CATEGORIES}.name AS "categoryName"
            FROM ${TABLES.GAMES}
                JOIN ${TABLES.CATEGORIES}
                    ON ${TABLES.GAMES}."categoryId" = ${TABLES.CATEGORIES}.id
            ${search}
        `)).rows;

        res.send(games);
    } catch (error) {
        res.status(STATUS_CODE.SERVER_ERROR).send(error);
    }
}

async function createGame(req, res) {
    const { body } = res.locals;
    const { name, image, stockTotal, categoryId, pricePerDay } = body;
    try {
        const insertion = await connection.query(`
            INSERT INTO ${TABLES.GAMES} 
                (name, image, "stockTotal", "categoryId", "pricePerDay")
            VALUES ($1, $2, $3, $4, $5);
        `, [name, image, stockTotal, categoryId, pricePerDay])

        res.sendStatus(STATUS_CODE.CREATED);
    } catch (error) {
        res.status(STATUS_CODE.SERVER_ERROR).send(error);
    }
}

export { 
    readGames,
    createGame
};