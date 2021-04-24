
import { app } from './app.js';
require("babel-core/register");
require("babel-polyfill");
const supertest = require('supertest');
const request = supertest(app);




/*it('Gets the test endpoint', async done => {
    // Sends GET Request to /test endpoint
    const response = await request.get('/api')
    expect(response.status).toBe(200);
    // ...
    done()
}); */

test("Status code is 200", async function (request,response) {
    response = await request.get('/api');
    response.to.have.status(200);
});