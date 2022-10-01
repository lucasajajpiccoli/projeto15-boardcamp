import express from 'express';
import cors from 'cors';

import { connection } from './db/database.js';

const server = express();
server.use(cors());
server.use(express.json());

server.get('/status', async (req, res) => {
    const categories = await connection.query('SELECT * FROM categories');
    res.send(categories.rows);
})

server.listen(4000, () => {
    console.log(`Listening on port 4000`);
});