let idUpdate = null;
function render() {
    const category = JSON.parse(localStorage.getItem("category")) || [];
    let stringHTML = 
    `
        <tr style="border: 1px solid #333;">
              <th style="width: 200px; border: 1px solid #333 ">ID</th>
              <th style="width: 300px; border: 1px solid #333 ">Loại Sản Phẩm</th>
              <th colspan="2" style="width: 300px">Chức Năng</th>
        </tr>
    `;
    for (let i = 0; i < category.length; i++) {
        stringHTML +=
        `
         <tr style="border: 1px solid #333;">
            <td style="border: 1px solid #333;">${category[i].id}</td>
            <td style="border: 1px solid #333;">${category[i].name}</td>
            <td >
                 <button onclick="clickUpdate(${category[i].id})">Update</button>
            </td>
            <td>
                <button onclick="clickDelete(${i})">Delete</button>
            </td>
        </tr>
        ` 
    }
    document.getElementById("myTable").innerHTML=stringHTML
}
render();

function add() {
    const category = JSON.parse(localStorage.getItem("category")) || [];
    const inputCategory = document.getElementById("nameCategory").value;
    if (!inputCategory) {
        alert("Nhập thông tin !!")
        return
    }
    let id=1;
    if (category.length != 0) {
        id = category[category.length - 1].id + 1
    }
    category.push({
        id,
        name: inputCategory
    })
    localStorage.setItem("category", JSON.stringify(category))
    document.getElementById("nameCategory").value = ""
    render();
}


function clickDelete(index) {
    const category = JSON.parse(localStorage.getItem("category")) || []
    category.splice(index, 1)
    localStorage.setItem("category", JSON.stringify(category))
    render()
}

function clickUpdate(id) {
    const category = JSON.parse(localStorage.getItem("category")) || []
    const index = category.findIndex(item => item.id == id)
    document.getElementById("nameCategory").value = category[index].name
    idUpdate = id
}

function update() {
    const category = JSON.parse(localStorage.getItem("category")) || []
    const index = category.findIndex(item => item.id == idUpdate)
    const inputCategory = document.getElementById("nameCategory").value
    if (!inputCategory) {
        alert("Nhập thông tin !!")
        return
    }
    category[index].name = inputCategory
    localStorage.setItem("category", JSON.stringify(category))
    document.getElementById("nameCategory").value = ""
    render()
    idUpdate = null
}