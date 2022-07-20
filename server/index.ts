import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import webSockets from './src/websockets';
import {startPoll} from './src/libs/poll';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;


app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

const socket = webSockets(server);
startPoll(socket, 10000);  

