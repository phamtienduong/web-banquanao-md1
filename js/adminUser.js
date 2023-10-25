function renderUser() {
    let listUser = JSON.parse(localStorage.getItem("users"));
    let result = `
      <tr class="tr1">
        <td class="td1">Email</td>
        <td class="td1">Tên người dùng</td>
        <td class="td1">Số điện thoại</td>
        <td class="td1">Tính năng</td>
        <td class="td1" colspan="2">Trạng thái</td>
      </tr>
    `;
    for (let i = 0; i < listUser.length; i++) {
      result += `
        <tr class="tr1">
          <td class="td1">${listUser[i].email}</td>
          <td class="td1">${listUser[i].userName}</td>
          <td class="td1">${listUser[i].phone}</td>
          <td class="td1">
            ${listUser[i].role == 0 ? 
            `<button id="button_${i}" class="buttonNe" onclick="banUser(${i})">
            ${listUser[i].status == 0  ? "Active" : "Ban"}
          </button>` : ""}
          </td>
          <td class="td1" id="trangthai_${i}">
            ${listUser[i].status == 0 ? "Ban" : "Active"}
          </td>
        </tr>
      `;
    }
    document.getElementById("tableUser").innerHTML = result;
  }

  function banUser(id) {
    let listUser = JSON.parse(localStorage.getItem("users"));
    let user = listUser[id];
    if (user.status == 1) {
      user.status = 0;
      // document.getElementById(`button_${id}`).innerHTML = "UnBan";
    } else {
      user.status = 1;
      // document.getElementById(`button_${id}`).innerHTML = "Ban";
    }
    // document.getElementById(`trangthai_${id}`).innerHTML = user.status == 0 ? "Ban" : "Unban";
    localStorage.setItem("users", JSON.stringify(listUser));
    renderUser()
    // Update localStorage with the corrected key ("users" instead of "listUser")
  }

  renderUser(); // Call the function to render the initial user list