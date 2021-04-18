getManufacturerList();


/* Get all list from response object and display to user */
async function getManufacturerList() {

    const response = await fetch('/api');
    const data = await response.json();
    /* for page loading spinner */
    if (response) {
        hideSpinner();
    }

    const list = document.getElementById('list');

    /*loop throgh each oject  */
    for (let items of data) {
        for (let item of items.Results) {
            // create a row of 3 elements
            const listRow = document.createElement('tr');

            listRow.classList.add('table-hover');

            const id = document.createElement('td');
            id.classList.add('col');
            id.textContent = item.Mfr_ID;


            const mName = document.createElement('td');
            mName.classList.add('col');
            mName.classList.add('mfrname');
            mName.textContent = item.Mfr_Name;
            // add click event so that we can get make for each manufacturer
            mName.addEventListener('click', async event => {
                window.open(`make.html?id=${item.Mfr_ID}`);
            });

            const country = document.createElement('td');
            country.classList.add('col');
            country.textContent = item.Country;


            listRow.append(id, mName, country,);
            list.append(listRow);
        }

    }


}
/* for page loading spinner */
function hideSpinner() {
    document.getElementById('spinner')
        .style.display = 'none';
}

