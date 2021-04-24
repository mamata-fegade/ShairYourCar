setup();

function validateInput() {
    const vinNo = document.getElementById('vin');
    const button = document.getElementById('submit');
    const formDiv = document.getElementById("formDiv");
    let expr = /[A-HJ-NPR-Z0-9]{17}/i;
    // console.log(vinNo);
    //regex function test
    if (!expr.test(vinNo.value)) {
        vinNo.classList.add('is-invalid');
        // console.log("Not matched " + vinNo.classList);
        button.disabled = true;

    } else if (vinNo.length == 17 && expr.test(vinNo.value)) {
        button.disabled = false;
        vinNo.classList.remove('is-invalid');
    } else {
        button.disabled = false;
        vinNo.classList.remove('is-invalid');

    }

}

function setup() {
    const button = document.getElementById('submit');
    //console.log(button);
    button.addEventListener('click', async event => {
        try {
            const vinInput = document.getElementById('vin');
            const vinDiv = document.getElementById('vinInfo');
            vinDiv.innerHTML = "";
            const vinNo = vinInput.value;
            const data = { vinNo };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            const response = await fetch('/api', options);
            const json = await response.json();
            console.log(json.Results);
            if (json.Results != undefined) {


                console.log(vinDiv);
                const carInfoDiv = document.getElementById('carInfoDiv');
                carInfoDiv.hidden = false;
                const p1 = document.createElement('p');
                const p2 = document.createElement('p');
                const p3 = document.createElement('p');
                const p4 = document.createElement('p');
                p1.innerHTML = " Vin: <b> " + vinNo + "</b>";
                p2.innerHTML = " Year: <b> " + json.Results[9].Value + "</b>";
                p3.innerHTML = " Make: <b> " + json.Results[6].Value + "</b>";
                p4.innerHTML = " Model: <b> " + json.Results[8].Value + "</b>";



                vinDiv.append(p1, p2, p3, p4);
                console.log(vinInput.innerText);
                vinInput.value = "";

            }
        }
        catch {
            console.log("Something went wrong");
        }
    });
}