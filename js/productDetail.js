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
    window.location.href = "./product-category.html"
  }

function render() {
    let listProduct = JSON.parse(localStorage.getItem("listProduct")) || []
    let idProduct = JSON.parse(localStorage.getItem("idProduct"))
    let product = listProduct.find(item => item.ID == idProduct)

    document.getElementById("img_product").src = product.img 
    document.getElementById("name_product").innerHTML = product.name 
    document.getElementById("price_product").innerHTML =  Number(product.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
    document.getElementById("id_product").innerHTML = product.ID 
}
render()


function renderSwiper() {
    let listProduct = JSON.parse(localStorage.getItem("listProduct")) || []
    let proposeProduct = randomProduct(listProduct, 8)
    let stringHTML = ""
    for (let i = 0; i < proposeProduct.length; i++) {
        stringHTML +=
        `
            <div class="swiper-slide">
                <div>
                    <div class="swiper-slide-img" onclick="gotoDetail('${proposeProduct[i].ID}')">
                        <img src="${proposeProduct[i].img}" alt="">
                    </div>
                    <div class="swiper-slide-price">
                        <span>${proposeProduct[i].name}</span> <br>
                        <span>
                            ${Number(proposeProduct[i].price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                        </span>
                    </div> 
                </div>
            </div>
        `
    }
    document.getElementById("swiper-wrapper").innerHTML = stringHTML
}
renderSwiper()

function randomProduct(arr, n) {
    if (n >= arr.length) {
      return arr; // Trả về toàn bộ mảng nếu n lớn hơn hoặc bằng độ dài của mảng
    }
    
    var shuffled = arr.slice(); // Sao chép mảng ban đầu để tránh ảnh hưởng đến mảng gốc
    var result = [];
    
    while (result.length < n) {
      var randomIndex = Math.floor(Math.random() * shuffled.length);
      result.push(shuffled[randomIndex]);
      shuffled.splice(randomIndex, 1);
    }
    
    return result;
}

function gotoDetail(id) {
    localStorage.setItem("idProduct", JSON.stringify(id))
    window.location.href = "../product/product-detail.html"
}


// =======================================================================
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
var swiper = newSwiper(".mySwiper", {
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
// ============================================================
function addToCart() {
    // lay id san pham hien tai
    let idProduct = JSON.parse(localStorage.getItem("idProduct")) || -1;
    // lay thong tin nguoi dung hien tai
    let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

    if (!currentUser.id) {
        handleSnackbar("Bạn chưa đăng nhập!")
        return
    }
    // lay ra cai cart cua nguoi hien tai
    let cart = currentUser.cart
    // tim vi tri san pham trong gio hang hien tai
    let index = cart.findIndex(item => item.idSP == idProduct)
    if (index == -1) {
        cart.push({
            idSP: idProduct,
            quantity: 1
        })
    } else {
        handleSnackbar("Bạn đã thêm sản phẩm này vào giỏ hàng rồi!")
    }
    currentUser.cart = cart
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
    document.getElementById("total-order").innerHTML = JSON.parse(localStorage.getItem("currentUser")).cart.length
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

// ===============
