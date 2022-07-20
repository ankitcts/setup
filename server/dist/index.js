"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const websockets_1 = __importDefault(require("./src/websockets"));
const poll_1 = require("./src/libs/poll");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
const server = app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
const socket = (0, websockets_1.default)(server);
(0, poll_1.startPoll)(socket, 10000);
