 //Lấy mảng Product trên local
 let listProduct = JSON.parse(localStorage.getItem("listProduct"));
 let category = JSON.parse(localStorage.getItem("category"));

 let currentPosition = 0
 
 // Lấy thẻ select từ DOM
 let categorySelect = document.getElementById("categorySelect");

 // Lặp qua danh sách category và thêm từng loại là một option
 category.forEach((categoryItem) => {
   let option = document.createElement("option");
   option.value = categoryItem.name;
   option.text = categoryItem.name;
   categorySelect.appendChild(option);
 });
 // Đọc ảnh
 let myImage = document.getElementById("image");
 let imageInput = document.getElementById("imgProduct");
 imageInput.onchange = function (event) {
   let file = event.target.files[0];
   // Đọc tệp ảnh và chuyển đổi nó thành dữ liệu URL
   let reader = new FileReader();
   reader.onload = function (event) {
     let dataUrl = event.target.result;
     myImage.src = dataUrl;
     localStorage.setItem("myImage", dataUrl);
   };
   reader.readAsDataURL(file);
 };
 // Sinh ID
 function makeCode() {
   let today = new Date();
   let day = today.getDay();
   let dd = today.getDate();
   let mm = today.getMonth() + 1;
   let yyyy = String(today.getFullYear());
   let h = today.getHours();
   let m = today.getMinutes();
   let s = today.getSeconds();
   m = checkTime(m);
   s = checkTime(s);
   if (dd < 10) {
     dd = "0" + dd;
   }
   if (mm < 10) {
     mm = "0" + mm;
   }
   function checkTime(i) {
     if (i < 10) {
       i = "0" + i;
     }
     return i;
   }
   return (result = yyyy + mm + dd + h + m + s);
 }

 // Render list product
 function renderProduct( data = listProduct) {
   let total = `
     <tr class="tr1">
       <td class="td1">ID</td>
       <td class="td1">Ảnh</td>
       <td class="td1">Tên</td>
       <td class="td1">Loại sản phẩm</td>
       <td class="td1">Giá</td>
       <td class="td1">Số lượng</td>
       <td class="td1" colspan="2">Tính năng</td>
     </tr>
 `;
   for (let i = 0; i < data.length; i++) {
     total += `
     <tr class="tr1">
       <td class="td1">${data[i].ID}</td>
       <td class="td1"><img src="${data[i].img}" alt="${data[i].name}" width="100px" height="100px" /></td>
       <td class="td1">${data[i].name}</td>
       <td class="td1">${data[i].category}</td>
       <td class="td1">${data[i].price}</td>
       <td class="td1">${data[i].quantity}</td>
       <td class="td1"><button class="buttonNe" onclick="editButton(${i})">Edit</button></td>
       <td class="td1"><button class="buttonNe" onclick="deleteButton(${i})">Delete</button>
         </td>
     </tr>
 `;
   }
   document.getElementById("tableAdded").innerHTML = total;
 }
 // Thêm sản phẩm
 function saveButton() {
   makeCode();
   let id = result;
   let nameProductInput = document.getElementById("nameProduct").value;
   let imgInput = localStorage.getItem("myImage");
   let priceProductInput = document.getElementById("priceProduct").value;
   let numberProduct = document.getElementById("sl").value;
   let category = document.getElementById("categorySelect").value;

   let newProduct = {
     ID: id,
     img: imgInput,
     name: nameProductInput,
     price: priceProductInput,
     quantity: numberProduct,
     category: category,
     
   };

   if (listProduct == null) {
     listProduct = [];
     listProduct.unshift(newProduct);
     localStorage.setItem("listProduct", JSON.stringify(listProduct));
   } else {
     listProduct.unshift(newProduct);
     localStorage.setItem("listProduct", JSON.stringify(listProduct));
   }
   document.getElementById("nameProduct").value = "";
   document.getElementById("priceProduct").value = "";
   document.getElementById("sl").value = "";
   localStorage.removeItem("myImage");
   renderProduct();
 }
 renderProduct();
 // Xóa sản phẩm
 function deleteButton(id) {
   listProduct.splice(id, 1);
   localStorage.setItem("listProduct", JSON.stringify(listProduct));
   renderProduct();
 }
 // Bắn thông tin sản phẩm cần sửa
 function editButton(id) {
   document.getElementById("nameProduct").value =
     listProduct[id].name;
   document.getElementById("priceProduct").value =
     listProduct[id].price;
   document.getElementById("sl").value =
     listProduct[id].quantity;
   myImage.src = listProduct[id].img;
   localStorage.setItem("flag", id);

   currentPosition = window.scrollY
   window.scrollTo({top:0,behavior:"smooth"})
 }
 // Chỉnh sửa thông tin của sản phẩm
 function editAll() {
   let id = localStorage.getItem("flag");
   listProduct[id].name = document.getElementById("nameProduct").value;
   listProduct[id].price = document.getElementById("priceProduct").value;
   listProduct[id].quantity = document.getElementById("sl").value;
   listProduct[id].category =
     document.getElementById("categorySelect").value;
   let newImage = localStorage.getItem("myImage");
   if (newImage !== null) {
     listProduct[id].img = newImage;
     localStorage.removeItem("myImage");
   }
   localStorage.setItem("listProduct", JSON.stringify(listProduct));
   nameProductInput = document.getElementById("nameProduct").value = "";
   priceProductInput = document.getElementById("priceProduct").value = "";
   numberProduct = document.getElementById("sl").value = "";
   localStorage.removeItem("myImage");
   renderProduct();
   window.scrollTo({top: currentPosition, behavior: "smooth"})
 }

 function searchButton() {
   let searchProduct=document.getElementById("searchProduct").value;
    let searchArr = listProduct.filter((item)=>{
     return item.name.toLowerCase().includes(searchProduct.toLowerCase())
   })
   renderProduct(searchArr)
 }