export const connectToServer = async (url = 'ws://localhost:8000/websockets') => {
    const ws = new WebSocket(url);
    return new Promise((resolve, reject) => {
        const timer = setInterval(() => {
            if(ws.readyState === 1) {
                clearInterval(timer)
                resolve(ws);
            }
        }, 10);
    });
}

export const send = (socket, data) => socket.send(JSON.stringify(data));
