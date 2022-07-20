"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startPoll = void 0;
const request = require('request');
const promisifiedRequest = function (options) {
    return new Promise((resolve, reject) => {
        request(options, (error, response) => {
            if (response) {
                return resolve(response);
            }
            if (error) {
                return reject(error);
            }
        });
    });
};
const getCall = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const options = {
            url: 'https://www.google.com',
            method: 'GET',
            gzip: true,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36'
            }
        };
        let response = yield promisifiedRequest(options);
        // console.log(response?.headers);
        // console.log(response.body);
        return response.body;
    }
    catch (ex) {
        console.log(ex);
    }
});
function startPoll(ws, polltime) {
    return __awaiter(this, void 0, void 0, function* () {
        setInterval(() => __awaiter(this, void 0, void 0, function* () {
            const data = yield getCall();
            ws.clients.forEach((clients) => {
                // clients.send(data?.text());
                clients.send(JSON.stringify({
                    data: 'app',
                    time: Date.now()
                }));
            });
        }), 2000);
    });
}
exports.startPoll = startPoll;
