import express from 'express';


const app = express();
app.use(express.json());

app.use(express.static('public'));

//module.exports = app ;
export { app as default };
