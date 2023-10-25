let userLogin = JSON.parse(localStorage.getItem("currentUser")) || {};
if (userLogin.id) {
    document.getElementById("icon-use").innerHTML=
    `
    <a class="login-user" onclick="logout()" >
        <i class="fa-solid fa-arrow-right-from-bracket"></i> <br>
        <span>ĐĂNG XUẤT</span>
    </a> 
    `
    document.getElementById("total-order")=innerHTML=userLogin.cart.length
}
else{
    document.getElementById("icon-use").innerHTML=
    `
    <a class="login-user" href="../login.html">
        <i class="fa-solid fa-user"></i> <br>
        <span>ĐĂNG NHẬP</span>
    </a>
    `
}
// ================================= LOGOUT ==================================== //
function logout(){
    localStorage.removeItem('currentUser');
    window.location.reload
}
// ================================= showSearch ==================================== //
function showSearch() {
    let showSearch= document.getElementById("search");
    showSearch.classList.toggle("hidden")
}   
// ================================= renderPanigation ==================================== //
// Trang hiện tại
let currentPage=1;
// tổng số trong
let totalPage = 1;

function renderPanigation() {
    // lấy danh sách sản phẩm trên Local
    let listProduct = JSON.parse(localStorage.getItem("listProduct")) || [];
    // tính tổng số trang dưa trên  số lượng sản phẩm hiển thị
    totalPage = Math.ceil(listProduct.length/6);

    let stringHTML=""
    for (let i = 1; i <= totalPage; i++) {
        if (i == currentPage) {
            // đánh dáu trang được chọn
            stringHTML +=  
            `
            <button onclick="chooseItemPage('${i}')" class = "item-page item-page-choose">${i}</button>
            `
        }else{
            stringHTML +=  
            `
            <button onclick="chooseItemPage('${i}')" class = "item-page">${i}</button>
            `
        }
    }
    document.getElementById("panigation").innerHTML= stringHTML
}
renderPanigation()
// ================================= chooseItemPage ==================================== //
// hàm xử lý chọn trang trong phân trang
function chooseItemPage(pageChoose) {
    let items = document.querySelectorAll(".item-page")
    for (let i = 0; i < items.length; i++) {
        if (i==pageChoose-1) {
            items[i].classList.add("item-page-choose")
        }else{
            items[i].classList.remove("item-page-choose")
        } 
    }
    currentPage = pageChoose;
}
// ================================= renderProduct ==================================== //  
// vẽ ra các sản phẩm theo trang
function renderProduct(){   
    let start = (currentPage-1)*6;
    let end = currentPage*6
    let listProduct = JSON.parse(localStorage.getItem("listProduct")) || [];
    let stringHTML = ""
    for (let i = start ; i<end ; i++){
        if (!listProduct[i]) {
            break;
    }
    stringHTML +=
    `
            <div class="product-item">
                <div class="product-img" onclick="gotoDetail('${listProduct[i].ID}')">
                    <a><img src="${listProduct[i].img}" alt=""></a>
                </div>
                <div class="product-detail">
                    <h3><a>${listProduct[i].name}</a></h3>
                </div>
                <div class="box-pro-prices">
                    <span>${Number(listProduct[i].price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                </div>
            </div>
    `
}
document.getElementById("collection-body").innerHTML= stringHTML
}
renderProduct()










