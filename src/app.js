import express from 'express';
import cors from 'cors';

import { categoriesRouter } from './routes/categories.router.js';
import { gamesRouter } from './routes/games.router.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use(categoriesRouter);
app.use(gamesRouter);

export { app };