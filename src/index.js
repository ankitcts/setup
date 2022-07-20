import React from "react";
import ReactDOM from "react-dom";
import {App} from './components/app.jsx';

console.log("document.getElementById('root')", document.getElementById('root'))
ReactDOM.render(<App/>, document.getElementById('root'));