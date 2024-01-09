let API_URL = "https://jsonplaceholder.typicode.com/users";

fetch(API_URL)
    .then((response) => {
        // console.log(response);
        response.json().then(function (data) {
            console.log(data);
            const headers = ['#', 'Name', 'Address', 'Phone ']

            const tableHtml = generateTable(headers, data);
            let app = document.getElementById('app');
            app.innerHTML = tableHtml;
        })
    })
    .catch((response) => {
        console.log("Error: \n" + response);
    })

const generateTableHeader = (headerTitles) => {
    if (!headerTitles || !Array.isArray(headerTitles) || headerTitles.length === 0) {
        return " ";
    }

    const headerHtml = headerTitles.map((title) => `<th>${title}</th>`);
    return `<thead><tr>${headerHtml.join('')}</tr></thead>`;
}

const generateTableRow = (data) => {

    return `
        <tr>
        <td>${data.id}</td>
        <td>${data.username}</td>
        <td>${data.email}</td>
        <td>${data.phone}</td>
        </tr>
    `;
}



// console.log(generateTableRow(object));

const generateTable = (headers, data) => {
    if (!headers || !data || headers.length === 0 || data.length === 0) {
        return " ";
    }
    const headerRow = generateTableHeader(headers);
    const dataRows = data.map((row, index) => generateTableRow(row, index)).join("");
    console.log(dataRows);

    return `<table class="table">${headerRow}<tbody>${dataRows}</tbody></table>`
}