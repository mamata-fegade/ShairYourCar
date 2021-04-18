import express from 'express';
export { app as default };

const app = express();
app.use(express.json());

app.use(express.static('public'));

// module.exports = { app };
