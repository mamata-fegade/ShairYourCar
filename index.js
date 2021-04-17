import express, { request, response } from 'express';
import fetch from 'node-fetch';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/api', async (request, response) => {
    const allData = [];
    let pageNo = 1;
    let count = 0;
    try {
        do {
            let manufacturerUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/GetAllManufacturers?ManufacturerType=Completed` + ' ' + `Vehicle` + ' ' + `Manufacturer&format=json&page=${pageNo}`;
            let mResponse = await fetch(manufacturerUrl);
            let mData = await mResponse.json();
            allData.push(mData);
            count = mData.Count;
            //console.log(count);
            pageNo++;
        } while (count > 0);
    } catch {
        console.log("Rejected");
    }



    response.json(allData);
});


app.get('/make/:id', async (request, response) => {
    console.log(request.params.id);
    const makeurl = `https://vpic.nhtsa.dot.gov/api/vehicles/GetMakeForManufacturer/${request.params.id}?format=json`;
    const makeResponse = await fetch(makeurl);
    const makeData = await makeResponse.json();
    response.json(makeData);
});


app.post('/api', async (request, response) => {

    const data = request.body;
    console.log(data);
    const decodeVinUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${data.vinNo}?format=json`;
    const vinResponse = await fetch(decodeVinUrl);
    const vinData = await vinResponse.json();

    response.json(vinData);
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(express.static('public'));
