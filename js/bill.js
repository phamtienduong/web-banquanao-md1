let userLogin = JSON.parse(localStorage.getItem("currentUser")) || {}
let users = JSON.parse(localStorage.getItem("users"));
let listProduct = JSON.parse(localStorage.getItem("listProduct"))

if (userLogin.id) {
    document.getElementById("icon-use").innerHTML = `
    <a class="login-user" onclick="logout()">
    <i class="fa-solid fa-arrow-right-from-bracket"></i> <br>
        <span>ĐĂNG XUẤT</span>
    </a>
    `
    document.getElementById("total-order").innerHTML = userLogin.cart.length;
} else {
    document.getElementById("icon-use").innerHTML = `
        <a class="login-user" href="./login.html">
            <i class="fa-solid fa-user"></i> <br>
            <span>ĐĂNG NHẬP</span>
        </a>
    `
}

function logout() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let index = users.findIndex(item => item.id == currentUser.id)
  users[index].cart = currentUser.cart
  localStorage.setItem("users", JSON.stringify(users))

  localStorage.removeItem("currentUser")
  location.reload()
}

function showSearch() {
    let showSearch = document.getElementById("search");
    showSearch.classList.toggle("hidden");
 }


function renderBills() {
    let bills = JSON.parse(localStorage.getItem("bills")) || [];
    let userLogin = JSON.parse(localStorage.getItem("currentUser")) || [];
    let stringCart="";
    let stringHTML="";
    let data = bills.filter(item => item.user_id == userLogin.id)
    for(let i=0 ; i < data.length ; i++){
        stringCart=""
        let cart = data[i].cart;
        for (let j = 0; j < cart.length; j++) {
            let product = listProduct.find((e)=>e.ID == cart[j].idSP)
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
        stringHTML+=
        `
                <tr style="border-bottom: 1px solid #333;">
                    <td>${i+1}</td>
                    <td>${data[i].id}</td>
                    <td>${stringCart}</td>
                    <td>
                        <p>Tên: ${data[i].fullName}</p> 
                        <p>Địa Chỉ: ${data[i].address}</p> 
                        <p>SĐT: ${data[i].phoneNumber}</p>
                    </td>
                    <td>${data[i].createdAt}</td>
                    <td>${Number(data[i].totalPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                    <td>${data[i].status == 0 ? "Đang chờ" : data[i].status == 1 ? "Chấp nhận" : "Từ chối"}</td>
                    <td>
                        ${data[i].status == 0 ? 
                        `<button onclick='deleteBill(${i})' class="btn btn-danger">Huỷ đơn</button>` : ""}
                    </td
                </tr>           
        `
    }
    document.getElementById("showOrder").innerHTML = stringHTML;
}
renderBills()
console.log(renderBills);

function deleteBill(index) {
    console.log(index);
    let bills = JSON.parse(localStorage.getItem("bills"));
    bills[index].status = 2
    console.log(bills);
    localStorage.setItem("bills",JSON.stringify(bills))
    renderBills()
}

function completed() {
    // alert("Bạn đã đặt hàng thành công");
    window.location.href = "./index.html";
}

function renderMenu() {
    let category = JSON.parse(localStorage.getItem("category")) || []
    console.log(category);
    let stringHTML = ""
    for (let i = 0; i < category.length; i++)  {
      stringHTML +=
      `
      <li><span style="color: black; cursor: pointer;" onclick="gotoProductCategory('${category[i].name}')">${category[i].name}</span></li>
      `
    }
    document.getElementById("sub-menu").innerHTML = stringHTML
  }
  renderMenu()
  
  function gotoProductCategory(category) {
    localStorage.setItem("category_page", JSON.stringify(category))
    window.location.href = "./product/product-category.html"
  }