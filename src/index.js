const select = document.getElementById("jobs_list");

select.addEventListener("change", ()=>{
    console.log(select.value);
    if(select.value == "analista") {
        createTbody(analystCriteria);
    } else if(select.value == "operario") {
        createTbody(operatorCriteria);
    } else if(select.value == "coordinador"){
        createTbody(coordinatorCriteria);
    } else {
        return;
    }
});

function createTbody(criteria) {

    const tbody = document.getElementById("tbody");
    tbody.innerHTML = '';

    criteria.forEach(element => {
        const newRow = document.createElement('tr');
        const col1 = document.createElement('td');
        const col2 = document.createElement('td');
        const col3 = document.createElement('td');
        const col4 = document.createElement('td');

        col1.innerHTML = `${element["name"]}`;
        col2.innerHTML = ` ${element["description"]}`;

        const scaleSelect = document.createElement('select');
        element["measurement scale"].forEach(item => {
            const option = document.createElement('option');
            option.innerText = item["name"];
            option.setAttribute('value', item["points"]);
            scaleSelect.appendChild(option);
        });

        col3.appendChild(scaleSelect);
        col4.innerHTML = scaleSelect.value;

        scaleSelect.addEventListener('change', ()=>{
            col4.innerHTML = scaleSelect.value;
        });

        newRow.appendChild(col1);
        newRow.appendChild(col2);
        newRow.appendChild(col3);
        newRow.appendChild(col4);

        tbody.appendChild(newRow);
    });
}