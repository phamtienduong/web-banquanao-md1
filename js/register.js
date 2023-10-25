let users = JSON.parse(localStorage.getItem("users")) || [];
function showSearch() {
    let showSearch = document.getElementById("search");
    showSearch.classList.toggle("hidden");
 }
 
//  Function đăng ký

let userName = document.getElementById("userName");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");
let userNameError = document.getElementById("userName-error");
let emailError = document.getElementById("email-error");
let phoneError = document.getElementById("phone-error")
let passwordError = document.getElementById("password-error");
let confirmPasswordError = document.getElementById("confirm-password-error");

function validate(data) {
    console.log(data);
    let { userName, email, password, confirmPassword, phone } = data;

    let regexName = /^\w{5,}$/;
    let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let regexPhone = /^0\d{9,10}$/
    let regexPassword = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    

    let check = true;
    if (!regexName.test(userName)) {
        
        userNameError.innerHTML = "Tên phải nhiều hơn 5 ký tự!";
        check = false;
    } else {
        userNameError.innerHTML = "";
    }

    if (email == "") {
        emailError.innerHTML = "Nhập email";
        check = false;
    } else if (!regexEmail.test(email)) {
        emailError.innerHTML = "Không đúng định dạng email!";
        check = false;
    } else {
        const users = JSON.parse(localStorage.getItem("users")) || []
        const checkIndex = users.findIndex(user => user.email == email)
        if (checkIndex != -1) {
            emailError.innerHTML = "Email đã tồn tại!";
            check = false
        } else {
            emailError.innerHTML = "";
        }
    }

    if (!regexPhone.test(phone)) {
        phoneError.innerHTML = "Không đúng định dạng số điện thoại!";
        check = false;
    } else {
        phoneError.innerHTML = "";
    }

    if (!regexPassword.test(password)) {
        passwordError.innerHTML = "Mật khẩu cần ít nhất 6 ký tự và chứa ít nhất một chữ hoa và một số!";
        check = false;
    } else {
        passwordError.innerHTML = "";
    }

    if (password.value !== confirmPassword.value) {
        confirmPasswordError.innerHTML = "Nhập lại mật khẩu không khớp!";
        check = false;
    } else {
        confirmPasswordError.innerHTML = "";
    }

    return check;
}

function register() {
    let data = {
        userName: userName.value,
        email: email.value,
        phone: phone.value,
        password: password.value,
        confirmPassword: confirmPassword.value
    };


    console.log(data);

    let check = validate(data);

    if (check) {
        let id = users.length + 1;
        users.push({
            id,
            ...data,
            cart: [],
            role: 0,
            status: 1
        });
        localStorage.setItem("users", JSON.stringify(users));
        handleSnackbar("Đăng ký thành công!")
        window.location.href = "./login.html"
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