// Access to the jobs list
const select = document.getElementById("jobs_list");

const namesSelect = document.getElementById("names_list");

// Adding a change event to the jobs list so it shows a different table fo each job, based on the specific criteria
select.addEventListener("change", ()=>{
    // console.log(select.value);
    namesSelect.innerHTML = '';
    if(select.value == "analista") {
        allEmployees.forEach(employee => {
            if(employee["RANGO"] == "ANALISTA") {
                const option = document.createElement('option');
                option.innerText = employee["NOMBRE"];
                namesSelect.appendChild(option);
            }
        });
        createTbody(analystCriteria);
    } else if(select.value == "operario") {
        allEmployees.forEach(employee => {
            if(employee["RANGO"] == "OPERARIO") {
                const option = document.createElement('option');
                option.innerText = employee["NOMBRE"];
                namesSelect.appendChild(option);
            }
        });
        createTbody(operatorCriteria);
    } else if(select.value == "coordinador"){
        allEmployees.forEach(employee => {
            if(employee["RANGO"] == "COORDINADOR") {
                const option = document.createElement('option');
                option.innerText = employee["NOMBRE"];
                namesSelect.appendChild(option);
            }
        });
        createTbody(coordinatorCriteria);
    } else {
        tbody.innerHTML = `
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        `;
        return;
    }
});

// Array to store the scores for every criteria
let allScores = [];

// Variable to store the total score of the employee
let totalScore;

// Access the tbody
const tbody = document.getElementById("tbody");

function createTbody(criteria) {
    // Cleaning the tbody
    tbody.innerHTML = '';

    // Cleaning of the scores array
    allScores = [];

    // Method to create a row with 4 columns for every element of the criteria
    criteria.forEach(element => {
        // Creating the row and the 4 columns
        const newRow = document.createElement('tr');
        const col1 = document.createElement('td');
        const col2 = document.createElement('td');
        const col3 = document.createElement('td');
        const col4 = document.createElement('td');

        // Adding content to columns 1 and 2
        col1.innerHTML = `${element["name"]}`;
        col2.innerHTML = ` ${element["description"]}`;

        // Creating a select element and adding to it an option for every item of the element
        const scaleSelect = document.createElement('select');
        element["measurement scale"].forEach(item => {
            const option = document.createElement('option');
            option.innerText = item["name"];
            option.setAttribute('value', item["points"]);
            scaleSelect.appendChild(option);
        });

        // Adding the select to the column 3 and its current value to te column 4
        col3.appendChild(scaleSelect);
        col4.innerHTML = scaleSelect.value;

        // Getting the index of the current element and using it to add a value to the scores' array in that specific position
        const index = criteria.indexOf(element);
        allScores.splice(index, 0, Number(scaleSelect.value));
        // console.log(allScores);

        // Adding a change event to the select in column 3, so it updates the value in column 4, the corresponding value in the scores' array, the total score of the employee, and the value of the total score cell
        scaleSelect.addEventListener('change', ()=>{
            col4.innerHTML = scaleSelect.value;
            allScores.splice(index, 1, Number(scaleSelect.value));
            // console.log(allScores);

            calculateTotalScore();
            document.getElementById('total_score_cell').innerHTML = totalScore;
        });

        // Adding all 4 columns to the row
        newRow.appendChild(col1);
        newRow.appendChild(col2);
        newRow.appendChild(col3);
        newRow.appendChild(col4);

        // Adding the row to the tbody
        tbody.appendChild(newRow);
    });

    // Calculating the total score
    calculateTotalScore();

    // Creating the final row with 2 columns
    const newRow2 = document.createElement('tr');
    const col1_2 = document.createElement('td');
    col1_2.setAttribute('colspan', 3);
    col1_2.setAttribute('class', 'long-cell');
    col1_2.innerText = 'TOTAL';
    const col2_2 = document.createElement('td');
    col2_2.setAttribute('id', 'total_score_cell'); // Adding id to access later
    col2_2.innerHTML = totalScore;

    // Adding the 2 coluns to the final row
    newRow2.appendChild(col1_2);
    newRow2.appendChild(col2_2);

    // Adding the final row to the tbody
    tbody.appendChild(newRow2);
}

// Function to calculate total score of the employee
function calculateTotalScore() {

    totalScore = allScores.reduce((total, score)=>{
        return total+score;
    });

    // console.log(totalScore);
}