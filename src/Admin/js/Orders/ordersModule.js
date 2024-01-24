const renderOrdersDisplay = async (products, orders, orderDetails) => {
    const ordersTableBody = document.getElementById("ordersTableBody");

    // Xóa nội dung cũ của tbody
    ordersTableBody ? ordersTableBody.innerHTML = "" : " ";

    // Thêm từng đơn hàng vào tbody
    await orders.forEach((order, index) => {
        // Lọc các chi tiết đơn hàng có cùng order_id với order.id
        const orderDetailsForOrder = orderDetails.filter(detail => detail.order_id === order.id);

        // Kiểm tra nếu có chi tiết đơn hàng thì mới hiển thị
        if (orderDetailsForOrder.length > 0) {
            // Kết hợp thông tin từ order và orderDetails
            const combinedInfo = {
                ...order,
                orderDetails: orderDetailsForOrder,
            };

            // Tổng số lượng từ chi tiết đơn hàng
            const totalQuantity = orderDetailsForOrder.reduce((sum, detail) => sum + detail.quantity, 0);

            // Tổng giá tiền từ chi tiết đơn hàng
            const totalPrice = orderDetailsForOrder.reduce((sum, detail) => sum + (detail.quantity * detail.unit_price), 0);

            const viPrice = new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            });

            const formattedPrice = viPrice.format(totalPrice);


            const html = `
                <tr data-id='${order.id}'>
                    <th scope="row">${index + 1}</th>
                    <td>${combinedInfo.customer_name}</td>
                    <td>${totalQuantity}</td>
                    <td>${formattedPrice}</td>
                    <td>${combinedInfo.create_date}</td>
                    <td class="w-3" align="center">
                        <a href="/order-details/${order.id}"><i class="fa-solid fa-eye"></i></a>
                    </td>
                    <td class="w-3"></td>
                </tr>
            `;
            ordersTableBody ? ordersTableBody.innerHTML += html : " ";
        }
    });
    // Hàm để hiển thị danh sách đơn hàng
}


export { renderOrdersDisplay }