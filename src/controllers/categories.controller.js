import { connection } from '../db/database.js';
import { TABLES } from '../enums/tables.js';
import { STATUS_CODE } from '../enums/statusCode.js';

async function readCategories(req, res) {
    try {
        const categories = (await connection.query(
            `SELECT * FROM ${TABLES.CATEGORIES};`
        )).rows;

        res.send(categories);
    } catch (error) {
        res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    }
}

async function createCategory(req,res) {
    const { name } = res.locals;
    try {
        const insertion = await connection.query(
          `INSERT INTO ${TABLES.CATEGORIES} (name) VALUES ($1);`,  
        [name]);

        res.sendStatus(STATUS_CODE.CREATED);
    } catch (error) {
        res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    }
}

export {
    readCategories,
    createCategory
};