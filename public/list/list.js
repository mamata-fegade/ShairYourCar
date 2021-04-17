getManufacturerList();

async function getManufacturerList() {

    const response = await fetch('/api');
    const data = await response.json();
    if (response) {
        hideSpinner();
    }

    const list = document.getElementById('list');

    for (let items of data) {
        for (let item of items.Results) {
            const listRow = document.createElement('tr');

            listRow.classList.add('table-hover');

            const id = document.createElement('td');
            id.classList.add('col');
            id.textContent = item.Mfr_ID;


            const mName = document.createElement('td');
            mName.classList.add('col');
            mName.textContent = item.Mfr_Name;
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
function hideSpinner() {
    document.getElementById('spinner')
        .style.display = 'none';
}

