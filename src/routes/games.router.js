import { Router } from 'express';

import { gamesMiddleware } from '../middlewares/games.middleware.js';

import {
    readGames, 
    createGame 
} from '../controllers/games.controller.js';

const gamesRouter = Router();

gamesRouter.get('/games', readGames);
gamesRouter.post('/games', gamesMiddleware, createGame);

export { gamesRouter };