getMake();

async function getMake() {

    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has('id')) {
        const id = urlParams.get('id')
        console.log(id);

        const mResponse = await fetch(`/make/${id}`);
        const makeData = await mResponse.json();
        console.log(makeData);
        if (makeData.Results.length != 0) {
            const div = document.getElementById('makeDiv');


            const pMfr = document.getElementById('mfrDiv');
            pMfr.textContent = makeData.Results[0].Mfr_Name;

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