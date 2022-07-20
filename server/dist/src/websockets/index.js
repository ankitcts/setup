"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-nocheck
const ws_1 = __importDefault(require("ws"));
const query_string_1 = __importDefault(require("query-string"));
exports.default = (expressServer) => {
    const websocketServer = new ws_1.default.Server({
        noServer: true,
        path: "/websockets",
    });
    expressServer.on("upgrade", (request, socket, head) => {
        websocketServer.handleUpgrade(request, socket, head, (websocket) => {
            websocketServer.emit("connection", websocket, request);
        });
    });
    websocketServer.on("connection", function connection(websocketConnection, connectionRequest) {
        var _a;
        const [_path, params] = (_a = connectionRequest === null || connectionRequest === void 0 ? void 0 : connectionRequest.url) === null || _a === void 0 ? void 0 : _a.split("?");
        const connectionParams = query_string_1.default.parse(params);
        // NOTE: connectParams are not used here but good to understand how to get
        // to them if you need to pass data with the connection to identify it (e.g., a userId).
        websocketConnection.on("message", (message) => {
            const parsedMessage = JSON.parse(message);
        });
    });
    return websocketServer;
};
