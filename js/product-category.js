let userLogin = JSON.parse(localStorage.getItem("currentUser")) || {}

if (userLogin.id) {
    document.getElementById("icon-use").innerHTML = `
    <a class="login-user" onclick="logout()">
    <i class="fa-solid fa-arrow-right-from-bracket"></i> <br>
        <span>ĐĂNG XUẤT</span>
    </a>
    `
    document.getElementById("total-order").innerHTML = userLogin.cart.length
} else {
    document.getElementById("icon-use").innerHTML = `
        <a class="login-user" href="../login.html">
            <i class="fa-solid fa-user"></i> <br>
            <span>ĐĂNG NHẬP</span>
        </a>
    `
}

function logout() {
    localStorage.removeItem("currentUser")
    location.reload()
}

// Chức năng chuyển đổi chế độ hiển thị của Function Tìm kiếm
function showSearch() {
    let showSearch = document.getElementById("search");
    showSearch.classList.toggle("hidden");
}

function renderProduct() {
    let listProduct = JSON.parse(localStorage.getItem("listProduct")) || []
    let category = JSON.parse(localStorage.getItem("category_page")) || []
    let stringHTML = "";
    let data = listProduct.filter(product => product.category == category)
    // Lặp qua các sản phẩm để tạo HTML
    for (let i = 0; i < data.length; i++) {
        stringHTML +=
        `
            <div class="product-item">
                <div class="product-img" onclick="gotoDetail('${data[i].ID}')">
                    <a><img src="${data[i].img}" alt=""></a>
                </div>
                <div class="product-detail">
                    <h3><a>${data[i].name}</a></h3>
                </div>
                <div class="box-pro-prices">
                    <span>${Number(data[i].price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                </div>
            </div>
        `
    }
    document.getElementById("collection-body").innerHTML = stringHTML;
}
renderProduct()

function gotoDetail(id) {
    localStorage.setItem("idProduct", JSON.stringify(id))
    window.location.href = "./product-detail.html"
}

function renderMenu() {
    const category = JSON.parse(localStorage.getItem("category")) || []
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
    window.location.href = "product-category.html"
  }

  function gotoDetail(id) {
    localStorage.setItem("idProduct", JSON.stringify(id))
    window.location.href = "../product/product-detail.html"
}