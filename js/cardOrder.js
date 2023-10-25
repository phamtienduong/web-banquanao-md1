let userLogin = JSON.parse(localStorage.getItem("currentUser")) || {}

if (userLogin.id) {
    document.getElementById("icon-use").innerHTML = `
    <a class="login-user" onclick="logout()">
    <i class="fa-solid fa-arrow-right-from-bracket"></i> <br>
        <span>ĐĂNG XUẤT</span>
    </a>
    `
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



function checkLogin() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
    if (!currentUser.id) {
        handleSnackbar("Bạn cần đăng nhập trước khi thực hiện")
        window.location.href = "./index.html"
        return
    }
}
checkLogin()

let totalPrice = 0
function renderCart() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
    let products = JSON.parse(localStorage.getItem("listProduct")) || [];
    let cart = currentUser.cart
    let stringHTML = ""; totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        let product = products.find(item => item.ID == cart[i].idSP)
        totalPrice += Number(product.price) * Number(cart[i].quantity)
        stringHTML +=
        `
            <tr >
                <td>${i+1}</td>
                <td>
                    <img src="${product?.img}" alt="" />
                </td>
                <td>${product.name}</td>
                <td>${Number(product.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                <td>
                    <button onclick="changeQuantity(${i}, 0)"> - </button>
                    ${cart[i].quantity}
                    <button onclick="changeQuantity(${i}, 1)"> + </button>
                </td>
                <td>${Number(Number(product.price) * Number(cart[i].quantity)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                <td>
                    <button class="delete" onclick="deleteProduct(${i})">Xoá</button>
                </td>
            </tr>
        `
    }
    document.getElementById("showOrder").innerHTML = stringHTML
    document.getElementById("totalPrice").innerHTML = Number(totalPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
    document.getElementById("total-order").innerHTML = cart.length
}
renderCart()

function changeQuantity(index, status) {
    let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
    let products = JSON.parse(localStorage.getItem("listProduct")) || [];
    let cart = currentUser.cart
    let product = products.find(item => item.ID == cart[index].idSP)
    switch (status) {
        case 0:
            if (cart[index].quantity - 1 > 0) {
                cart[index].quantity -= 1
            }
            break
        case 1:
            if (cart[index].quantity + 1 <= product.quantity) {
                cart[index].quantity += 1
            }
            // else{
            //     alert('Số lượng không vượt quá số lượng trong kho')
            // }
            
            break
    }
    currentUser.cart = cart
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
    renderCart()
}

function deleteProduct(index) {
    let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
    let cart = currentUser.cart
    cart.splice(index, 1)
    currentUser.cart = cart
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
    renderCart()
    
}

function checkout() {

    let fullName = document.getElementById("fullName").value;
    let address = document.getElementById("address").value;
    let phoneNumber = document.getElementById("phoneNumber").value;
    let fullNameError = document.getElementById("fullName-error");
    let addressError = document.getElementById("address-error");
    let phoneNumberError = document.getElementById("phoneNumber-error");

    let regexPhone = /^0\d{9,10}$/
    let check = true
    if (fullName=="") {
        fullNameError.innerHTML= "Nhập đầy đủ Họ Tên"  
        check = false;      
    }else{
        fullNameError.innerHTML=""
    }
    if (address=="") {
        addressError.innerHTML="Nhập Địa Chỉ Thường Trú"
        check = false;      
    }else{
        addressError.innerHTML=""
    }
    if (!regexPhone.test(phoneNumber)){
        phoneNumberError.innerHTML="Số điện thoại không hợp lệ"
        check = false;
    } else {
        phoneNumberError.innerHTML="";
    }

    if (!check) {
        return 
    }



    let userLogin = JSON.parse(localStorage.getItem("currentUser"))
    if (userLogin.cart.length == 0) {
        handleSnackbar("Giỏ hàng trống")
        return
    }

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = String(today.getFullYear());
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
        
    let newBill = {
        id: Date.now(),
        user_id: userLogin.id,
        createdAt: `${h}:${m}:${s}, ${dd}/${mm}/${yyyy}`,
        cart: userLogin.cart,
        totalPrice,
        status: 0,
        fullName,
        address,
        phoneNumber,
    }
    let bills = JSON.parse(localStorage.getItem("bills")) || []
    bills.push(newBill)
    localStorage.setItem("bills", JSON.stringify(bills))

    userLogin.cart = []
    localStorage.setItem("currentUser", JSON.stringify(userLogin))

    window.location.href = "bill.html"
}

function renderMenu() {
    let category = JSON.parse(localStorage.getItem("category")) || []
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

  // Hàm hiển thị thông báo
function handleSnackbar(param) {
    const snackbar = document.createElement("div");
    snackbar.classList.add("snackbar");
    snackbar.innerText = param;
    document.body.appendChild(snackbar);

    setTimeout(() => {
        snackbar.remove();
    }, 5000);
}