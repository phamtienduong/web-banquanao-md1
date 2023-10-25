let userLogin = JSON.parse(localStorage.getItem("currentUser")) || {}

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

//  Swiper
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

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