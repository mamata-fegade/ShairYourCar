import app from './app.js';
import fetch from 'node-fetch';

const PORT = process.env.PORT || 5000;

/* Get information from Manufacturer api for all pages */
app.get('/api', async (request, response) => {
    const allData = []; //to store all pages information
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


/* Get all make of perticular manufacturer  */
app.get('/make/:id', async (request, response) => {
    // console.log(request.params.id);
    const makeurl = `https://vpic.nhtsa.dot.gov/api/vehicles/GetMakeForManufacturer/${request.params.id}?format=json`;
    const makeResponse = await fetch(makeurl);
    const makeData = await makeResponse.json();
    response.json(makeData);
});

/* Get information of vehicle by providing vin number - call to DecodeVin api*/
app.post('/api', async (request, response) => {

    const data = request.body;
    // console.log(data);
    const decodeVinUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${data.vinNo}?format=json`;
    const vinResponse = await fetch(decodeVinUrl);
    const vinData = await vinResponse.json();
    response.json(vinData);
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

