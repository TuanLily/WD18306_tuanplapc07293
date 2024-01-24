const renderUserDisplay = async (orders) => {
    const userTableBody = document.getElementById("userTableBody");

    // Xóa nội dung cũ của tbody
    userTableBody ? userTableBody.innerHTML = "" : " ";

    // Thêm từng đơn hàng vào tbody
    await orders.forEach((order, index) => {

        const html = `
            <tr data-id='${order.id}'>
                <th scope="row">${index + 1}</th>
                <td>${order.customer_name}</td>
                <td>${order.customer_address}</td>
                <td>${order.customer_email}</td>
                <td>${order.customer_phone_number}</td>
                <td class="w-3">
                    <a href=""><i class="fa-solid fa-eye"></i></a>
                </td>
                <td class="w-3"> <a href=""><i class="fa-solid fa-trash"></i></a>
                </td>
            </tr>
        `;
        userTableBody ? userTableBody.innerHTML += html : " ";
    });
    // Hàm để hiển thị danh sách đơn hàng
}



export { renderUserDisplay }