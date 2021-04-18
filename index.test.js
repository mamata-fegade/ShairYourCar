//const app = require('./app.js'); // Link to your server file
import app from './app.js';
const supertest = require('supertest');
const request = supertest(app);



// test("Status code is 200", async function () {
//     response.to.have.status(200);
// });

// it('Testing to see if Jest works', () => {
//     expect(1).toBe(1)
// })

it('Gets the test endpoint', async done => {
    // Sends GET Request to /test endpoint
    const response = await request.get('/api')
    expect(response.status).toBe(200);
    // ...
    done()
})