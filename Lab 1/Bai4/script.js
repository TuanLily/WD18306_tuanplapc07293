    const API_URL =
        "https://datausa.io/api/data?drilldowns=Nation&measures=Population";

    fetch(API_URL).then((response) => {
        response.json().then((data) => {
            let app = document.getElementById("listData");

            let list = data.data;
            let num = 0;

            let html = `<table class="table">

                                <tr class="table-warning">
                                    <th>#</th>
                                    <th>Nation</th>
                                    <th>Population</th>
                                    <th>Year</th>
                                </tr>
                `;

            list.forEach(element => {
                html += `<tr class="table-secondary">
                                <td>${num += 1}</td>
                                <td>${element.Nation}</td>
                                <td>${element.Population}</td>
                                <td>${element.Year}</td>
                            </tr>`;
            });

            html += `</table>`;

            app.innerHTML = html;
            // console.log(list);
        });
    });


    // Ý 2

    const API_URL2 =
        "https://65929f4fbb129707198fe18e.mockapi.io/tinhpv10/students";

    fetch(API_URL2).then((response) => {
        response.json().then((data2) => {
            let getData = document.getElementById("listInfoStudent");
            let num = 0;

            let html = `<table class="table">

                                <tr class="table-warning">
                                    <th>#</th>
                                    <th>Ảnh đại diện</th>
                                    <th>Họ Và Tên</th>
                                    <th>Ngày tạo</th>
                                </tr>
                `;

            data2.forEach(element => {
                html += `<tr class="table-light">
                                <td>${num += 1}</td>
                                <td><img src="${element.avatar}" alt="IMG"></td>
                                <td>${element.name}</td>
                                <td>${element.createdAt}</td>
                            </tr>`;
            });

            html += `</table>`;

            getData.innerHTML = html;
            // console.log(data2);
        });
    });
