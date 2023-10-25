let users=JSON.parse(localStorage.getItem("users"))||[];
function showSearch() {
    let showSearch = document.getElementById("search");
    showSearch.classList.toggle("hidden");
 }
//  function đăng nhập
// tạo mảng thông tin người dùng
function login() {
    let userName = document.getElementById("username");
    let passWord = document.getElementById("password");
    if (userName.value == "" || passWord.value == "") {
        handleSnackbar("Vui lòng nhập đầy đủ thông tin!")
        return
    }
    let check = false;

    for (let i = 0; i < users.length; i++) {
        if ( userName.value == users[i].userName && passWord.value == users[i].password ) {
            if(users[i].role==0){
                if(users[i].status == 0){
                    handleSnackbar("Tài khoản bị khoá")
                    return;
                }
                localStorage.setItem("currentUser", JSON.stringify(users[i]))
                // chuyển trang
                check= true;
                window.location.href = "./index.html"
                
            }else{
                window.location.href = "adminProduct.html"
            }
            return
        } 
    }

    if (!check) {
        handleSnackbar("Tài khoản không tồn tại")
    }   
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
    
// let user = {
//     userName: "admin",
//     password: "admin",
//     role: 1
// }
// users.push(user) 
// localStorage.setItem('users', JSON.stringify(users))