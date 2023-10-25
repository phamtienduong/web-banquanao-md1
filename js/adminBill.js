// Lấy dữ liệu người dùng và sản phẩm từ local storage
let users = JSON.parse(localStorage.getItem("users"))
let products = JSON.parse(localStorage.getItem("listProduct"))  

// Function hiển thị danh sách hoá đơn
function renderBills() {
    let bills = JSON.parse(localStorage.getItem("bills")) || []
    let stringHTML = ""
    let stringCart = ""
    
    for(let i = 0; i < bills.length; i++) {
        stringCart = ""
        let cart = bills[i].cart
        // Hiển thị giỏ hàng của mỗi bill
        for(let j = 0; j < cart.length; j++) {
        // Tìm chi tiết sản phẩm dựa trên ID của nó
            let product = products.find(e => e.ID == cart[j].idSP)
            stringCart +=
            `
                <div>
                    <img width="50px" src="${product.img}" />
                    <br>
                    <span>${product.name}</span>
                    <span>SL: ${cart[j].quantity}</span>
                </div>
            `
        }
        // Tìm thông tin người dùng dựa trên ID người dùng trong hóa đơn
        let findUser = users.find(e => e.id == bills[i].user_id);
        stringHTML +=
        `
        <tr style="border-bottom: 1px solid #333;">
            <td>${bills[i].id}</td>
            <td>
                <p>${findUser.userName}</p>
                <p>${bills[i].createdAt}</p>
            </td>
            <td>${stringCart}</td>
            <td>${Number(bills[i].totalPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
            <td>
                <p>Tên: ${bills[i].fullName}</p> 
                <p>Địa Chỉ: ${bills[i].address}</p> 
                <p>SĐT: ${bills[i].phoneNumber}</p>
            </td>
            <td>${bills[i].status == 0 ? "Đang chờ" : bills[i].status == 1 ? "Chấp nhận" : "Từ chối"}</td>
            <td>
                ${bills[i].status == 0 ? (
                    `<button class="btn_1" onclick="changeStatus('${i}', 1)"> Chấp Nhận </button>
                     <button class="btn_1" onclick="changeStatus('${i}', 2)"> Từ Chối </button>`
                ) : `<span></span>`}
            </td>
        </tr>
        `
    }
    document.getElementById("table_body").innerHTML = stringHTML
}
// Gọi hàm renderBills để hiển thị các hóa đơn
renderBills()


// Chức năng thay đổi trạng thái của hóa đơn
function changeStatus(index, status) {
    let bills = JSON.parse(localStorage.getItem("bills")) || []
    bills[index].status = status
    localStorage.setItem("bills", JSON.stringify(bills))
    // Hiển thị lại hóa đơn sau khi thay đổi trạng thái
    renderBills()
}