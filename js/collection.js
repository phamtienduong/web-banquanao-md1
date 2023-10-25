// Xác định một biến để theo dõi trang hiện tại
let currentPage = 1

// Khởi tạo một biến để chứa tổng số trang
let totalPage = 1
// lấy dữ liệu của currentUser trên Local
let userLogin = JSON.parse(localStorage.getItem("currentUser")) || {}

let productRender = JSON.parse(localStorage.getItem("listProduct")) || []
// Chức năng kiểm tra đăng nhập và đăng xuất của người dùng
if (userLogin.id) {
    // Người dũng đã đăng nhập
    document.getElementById("icon-use").innerHTML = `
    <a class="login-user" onclick="logout()">
    <i class="fa-solid fa-arrow-right-from-bracket"></i> <br>
        <span>ĐĂNG XUẤT</span>
    </a>
    `
    // hiện thị số lượng sản phâm có trong giỏ hàng
    document.getElementById("total-order").innerHTML = userLogin.cart.length
} else {
    // Người dùng chưa đăng nhập
    document.getElementById("icon-use").innerHTML = `
        <a class="login-user" href="../login.html">
            <i class="fa-solid fa-user"></i> <br>
            <span>ĐĂNG NHẬP</span>
        </a>
    `
}   

// Chức năng đăng xuất 
function logout() {
    // xóa thông tin đăng nhập của người dùng khỏi bộ nhớ cục bộ 
    localStorage.removeItem("currentUser")
    // Tải lại trang
    location.reload()
}

// Chức năng chuyển đổi chế độ hiển thị của Function Tìm kiếm
function showSearch() {
    let showSearch = document.getElementById("search");
    showSearch.classList.toggle("hidden");
}

// Hàm hiển thị các nút phân trang
function renderPagination() {

    totalPage = Math.ceil((productRender.length / 6))
    
    let stringHTML = ""
    for (let i = 1;  i <= totalPage; i++ ) {
        if (i == currentPage) {
            // Đánh dấu trang đang được chọn
            stringHTML += 
            `
                <button onclick="chooseItemPage('${i}')" class="item-page item-page-choose">${i}</button>
            `
        } else {
            stringHTML += 
            `  
                <button onclick="chooseItemPage('${i}')" class="item-page">${i}</button>
            `
        }
    }
    document.getElementById("pagination").innerHTML = stringHTML
}
renderPagination()

// Hàm xử lý việc chọn trang trong phân trang
function chooseItemPage(pageChoose) {
    let items = document.querySelectorAll(".item-page");
    for (let i = 0; i < items.length; i++) {
        if (i == pageChoose - 1) {
            items[i].classList.add("item-page-choose");
        }
        else {
            items[i].classList.remove("item-page-choose");
        }
    }
    currentPage = pageChoose;
    renderProduct(currentPage);
}

// Chức năng hiển thị sản phẩm trên trang hiện tại
function renderProduct(currentPage = 1) {
    // Tính chỉ số đầu và cuối của sản phẩm trên trang hiện tại
    let start = (currentPage - 1) * 6
    let end = currentPage * 6
    // Lấy danh sách sản phẩm từ bộ nhớ cục bộ hoặc một mảng trống

    let stringHTML = "";
    // Lặp qua các sản phẩm để tạo HTML
    for (let i = start; i < end; i++) {
        if(!productRender[i]) {
            break
        }
        stringHTML +=
        `
            <div class="product-item">
                <div class="product-img" onclick="gotoDetail('${productRender[i].ID}')">
                    <a><img src="${productRender[i].img}" alt=""></a>
                </div>
                <div class="product-detail">
                    <h3><a>${productRender[i].name}</a></h3>
                </div>
                <div class="box-pro-prices">
                    <span>${Number(productRender[i].price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                </div>
            </div>
        `
    }
    document.getElementById("collection-body").innerHTML = stringHTML;
}
renderProduct()

// Chức năng điều hướng giữa các trang (trước hoặc sau)
function changePage(status) {
    switch (status) {
        case 0: 
            // Điều hướng đến trang trước
            if (currentPage == 1) {
                currentPage = totalPage
            } else {
                currentPage -= 1
            }
            chooseItemPage(currentPage)
            renderProduct(currentPage)
            break

        case 1: 
        // Điều hướng đến trang tiếp theo           
            if (currentPage == totalPage) {
                currentPage = 1
            } else {
                currentPage += 1
            }
            chooseItemPage(currentPage)
            renderProduct(currentPage)
            break
    }
}

// Chức năng tìm kiếm sản phẩm dựa trên đầu vào của người dùng
function searchButton() {
    let listProduct = JSON.parse((localStorage.getItem("listProduct"))) || [];
    let textSearch = document.getElementById("search").value;
    currentPage = 1
    if (!textSearch) {  
        productRender = listProduct
        renderPagination()
        renderProduct(1)
    } else {
        data = listProduct.filter(item => item.name.toLowerCase().includes((textSearch.toLowerCase())))
        productRender = data
        renderPagination()
        renderProduct(1)
    }

}

// hàm đi đến trang chi tiết sản phẩm
function gotoDetail(id) {
    // lưu id sản phẩm lên local
    localStorage.setItem("idProduct", JSON.stringify(id))
    window.location.href = "../product/product-detail.html"
}

// =============
// Hàm render category
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

//   hàm đi đến sản phẩm category
  function gotoProductCategory(category) {
    localStorage.setItem("category_page", JSON.stringify(category))
    window.location.href = "../product/product-category.html"
  }
