import { Router } from 'express';

import { categoriesMiddleware } from '../middlewares/categories.middleware.js';

import {
     readCategories,
     createCategory
} from '../controllers/categories.controller.js';

const categoriesRouter = Router();

categoriesRouter.get('/categories', readCategories);
categoriesRouter.post('/categories', categoriesMiddleware, createCategory);

export { categoriesRouter };