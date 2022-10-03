import { Router } from 'express';

import { customersMiddleware } from '../middlewares/customers.middleware.js';

import {
    readCustomers,
    readCustomerById,
    createCustomer,
    updateCustomer
} from '../controllers/customers.controller.js';

const customersRouter = Router();

customersRouter.get('/customers', readCustomers);
customersRouter.get('/customers/:id', readCustomerById);

customersRouter.use(customersMiddleware);
customersRouter.post('/customers', createCustomer);
customersRouter.put('/customers/:id', updateCustomer);

export { customersRouter };