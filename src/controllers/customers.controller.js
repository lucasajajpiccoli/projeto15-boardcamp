import { connection } from '../db/database.js';
import { TABLES } from '../enums/tables.js';
import { STATUS_CODE } from '../enums/statusCode.js';

async function readCustomers(req, res) {
    const { cpf } = req.query;
    const search = cpf ? `
    WHERE ${TABLES.CUSTOMERS}.name LIKE '${cpf}%';
` : `;`;

    try {
        const customers = (await connection.query(`
        SELECT * FROM ${TABLES.CUSTOMERS} ${search}
    `)).rows;

        res.send(customers);
    } catch (error) {
        res.status(STATUS_CODE.SERVER_ERROR).send(error);
    }

}

async function readCustomerById(req, res) {
    const { id } = req.params;
    if (!id) { return res.sendStatus(STATUS_CODE.BAD_REQUEST) }

    try {
        const customer = (await connection.query(`
            SELECT * FROM ${TABLES.CUSTOMERS} WHERE id = $1;
        `, [Number(id)])).rows;

        if (!customer[0]) {
            return res.sendStatus(STATUS_CODE.NOT_FOUND);
        }

        res.send(customer);
    } catch (error) {
        res.status(STATUS_CODE.SERVER_ERROR).send(error);
    }
}

async function createCustomer(req, res) {
    const { name, phone, cpf, birthday } = res.locals.body;
    try {
        const insertion = await connection.query(`
            INSERT INTO ${TABLES.CUSTOMERS}
                (name, phone, cpf, birthday)
            VALUES ($1, $2, $3, $4);
        `, [name, phone, cpf, birthday]);

        res.sendStatus(STATUS_CODE.CREATED);
    } catch (error) {
        res.status(STATUS_CODE.SERVER_ERROR).send(error);
    }
}

async function updateCustomer(req, res) {
    const { name, phone, cpf, birthday } = res.locals.body;
    const { id } = req.params;

    if (!id) { return res.sendStatus(STATUS_CODE.NOT_FOUND); }

    try {
        const customer = (await connection.query(`
            SELECT * FROM ${TABLES.CUSTOMERS} WHERE id = $1;
        `, [Number(id)])).rows;

        if (!customer[0]) {
            return res.sendStatus(STATUS_CODE.NOT_FOUND);
        }

        const updation = await connection.query(`
            UPDATE ${TABLES.CUSTOMERS}
                SET
                    name = $1,
                    phone = $2,
                    cpf = $3,
                    birthday = $4
            WHERE id = $5;
        `, [name, phone, cpf, birthday, Number(id)]);

        res.sendStatus(STATUS_CODE.OK);
    } catch (error) {
        res.status(STATUS_CODE.SERVER_ERROR).send(error);
    }
}

export {
    readCustomers,
    readCustomerById,
    createCustomer,
    updateCustomer
};