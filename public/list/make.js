getMake();
/* Get make for manufacture- an api call to make by passing id */
async function getMake() {

    const queryString = window.location.search;

    //get parsmeters from url
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has('id')) {
        const id = urlParams.get('id')
        console.log(id);

        //get data from api 
        const mResponse = await fetch(`/make/${id}`);
        const makeData = await mResponse.json();
        //console.log(makeData);

        if (makeData.Results.length != 0) {
            const div = document.getElementById('makeDiv');

            const pMfr = document.getElementById('mfrDiv');
            pMfr.textContent = makeData.Results[0].Mfr_Name;

            // append data to page
            for (let item of makeData.Results) {
                const p = document.createElement('p');
                p.classList.add('makelist');
                p.textContent = item.Make_Name;
                div.append(p);
            }
        }
        else {
            const pMfr = document.getElementById('mfrDiv');
            pMfr.textContent = "No Data Found";
        }
    }
}