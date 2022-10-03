import { customersSchema } from '../schemas/customers.schema.js';
import { connection } from '../db/database.js';
import { TABLES } from '../enums/tables.js';
import { STATUS_CODE } from '../enums/statusCode.js';

async function customersMiddleware(req, res, next) {
    const validation = customersSchema.validate(req.body, { abortEarly: false });
    if (validation.error) { 
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(STATUS_CODE.BAD_REQUEST).send(errors);
    }

    try {
        const customer = (await connection.query(`
            SELECT * FROM ${TABLES.CUSTOMERS} WHERE cpf = $1;
        `, [req.body.cpf])).rows;
        if (customer[0]) { return res.sendStatus(STATUS_CODE.CONFLICT) }

        res.locals.body = req.body;
        next();
    } catch (error) {
        res.status(STATUS_CODE.SERVER_ERROR);    
    }
}

export { customersMiddleware };