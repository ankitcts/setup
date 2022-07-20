const request = require('request');

const promisifiedRequest = function (options: Record<string, any>) {
    return new Promise((resolve, reject) => {
        request(options, (error: any, response: any) => {
            if (response) {
                return resolve(response);
            }
            if (error) {
                return reject(error);
            }
        });
    });
};
import WebSocket from "ws";

const getCall = async () => {
    try {
        const options = {
            url: 'https://www.google.com',
            method: 'GET',
            gzip: true,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36'
            }
        };

        let response: any = await promisifiedRequest(options);

        // console.log(response?.headers);
        // console.log(response.body);
        return response.body;
    } catch (ex: any) {
        console.log(ex)
    }
}

export async function startPoll(ws: WebSocket.Server, polltime: Number) {
    setInterval(async () => {
        const data = await getCall();
        ws.clients.forEach((clients) => {
            // clients.send(data?.text());
            clients.send(JSON.stringify({
                data: 'app',
                time: Date.now()
            }))
        })
    }, 2000);
}