import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const hostname = '127.0.0.1';
const PORT = process.env.PORT || 3000;

const server = express();
const corsOptions = {
  origin: `http://localhost:${PORT}`
};

server.use(cors(corsOptions));
server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.get('/', (request: Request, response: Response) => {
  response.send('Connected to XPG...');
});

server.listen(PORT, () => console.log(`Server is listening at http://${hostname}:${PORT}`))