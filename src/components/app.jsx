import React from 'react' 
import {connectToServer, send} from '../lib/ws-connect';

export class App extends React.Component{
    socket;
    constructor(props) {
        super(props)
        this.state = {
            data: ''
        }
    }

    componentDidMount() {
        connectToServer().then((socket) => {
            socket.onmessage = (message) => {
                this.setState({
                    data: JSON.parse(message.data)
                })
            }
            socket.send(JSON.stringify({
                a: 1,
                b: 2
            }))
        });
    }

    render() {
        return(<div>
            <h3>Socket Communication</h3>
            {this.state.data.time}
        </div>)
    }
}