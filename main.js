let btn = document.querySelector(".btn");
let name = document.querySelector(".task-inputName");
let email = document.querySelector(".task-inputEmail");
let imageUrl = document.querySelector(".task-inputImageUrl");
let phone = document.querySelector(".task-inputPhone");
let wrapper = document.querySelector(".wrapper");

let ul = document.querySelector(".task-list");

btn.addEventListener("click", () => {
  if (
    !name.value.trim() ||
    !email.value.trim() ||
    !imageUrl.value.trim() ||
    !phone.value.trim()
  ) {
    alert("Заполните все поля");
    return;
  }
  let obj = {
    name: name.value,
    email: email.value,
    imageUrl: imageUrl.value,
    phone: phone.value,
  };
  name.value = "";
  email.value = "";
  imageUrl.value = "";
  phone.value = "";

  setItemToStorage(obj);
  createElement();
});
createElement();

function setItemToStorage(prod) {
  if (!localStorage.getItem("name")) {
    localStorage.setItem("name", "[]");
  }

  let data = JSON.parse(localStorage.getItem("name"));

  data.push(prod);

  localStorage.setItem("name", JSON.stringify(data));
}

// ? Create

createElement();

function createElement() {
  if (!localStorage.getItem("name")) {
    localStorage.setItem("name", "[]");
  }
  let newData = JSON.parse(localStorage.getItem("name"));
  ul.innerHTML = "";
  newData.forEach((item, index) => {
    let li = document.createElement("li");
    let img = document.createElement("img");
    img.setAttribute("src", item.imageUrl);
    img.style.width = "410px";
    img.style.height = "300px";
    img.style.borderRadius = "20px";
    let btnDelete = document.createElement("button");
    let btnEdit = document.createElement("button");
    li.innerText = `Name: ${item.name}
     Email: ${item.email} 
     Phone: ${item.phone}`;

    btnDelete.innerText = "Delete";
    btnEdit.innerText = "Edit";
    li.style.cssText = `color: black; list-style-type: none; 
    line-height:30px; background-color: beige; width:400px; 
    padding:5px; border-radius:15px; margin-bottom: 14px; margin-top:60px`;
    btnEdit.style.cssText = `
    width: 70px;
    height: 25px;
    margin-left: 10px;
    background-color: rgb(58, 158, 158);;
    border-radius: 7px;
    border: none;
    color: beige;
    margin-bottom: 10px;
    cursor:pointer;
    `;
    btnDelete.style.cssText = `
    width: 70px;
    height: 25px;
    margin-left: 10px;
    background-color: rgb(58, 158, 158);;
    border-radius: 7px;
    border: none;
    color: beige;
    margin-bottom: 10px;
    cursor:pointer;
    `;

    li.append(btnDelete);
    li.append(btnEdit);

    btnDelete.addEventListener("click", () => {
      deleteElement(index);
      createElement();
    });

    btnEdit.addEventListener("click", () => {
      editElement(index);
      wrapper.style.opacity = "0";
      wrapper.style.transition = "1s";
    });
    ul.append(li);
    ul.appendChild(img);
  });
}
createElement();

let localname = JSON.parse(localStorage.getItem("name"));
// console.log(localname);

if (localname.length == 0) {
  // let last = localname[localname.length - 1];
  name.value = "";
  imageUrl.value = "";
  email.value = "";
  phone.value = "";
} else {
  let last = localname[localname.length - 1];
  name.value = last.name;
  imageUrl.value = last.imageUrl;
  email.value = last.email;
  phone.value = last.phone;
}

function deleteElement(index) {
  let data = JSON.parse(localStorage.getItem("name"));
  data.splice(index, 1);
  localStorage.setItem("name", JSON.stringify(data));
}

// ? edit
let mainModal = document.querySelector(".main-modal");
let EditName = document.querySelector(".inp-editName");
let EditEmail = document.querySelector(".inp-editEmail");
let EditImageUrl = document.querySelector(".inp-editImageUrl");
let EditPhone = document.querySelector(".inp-editPhone");

let btnCloser = document.querySelector(".btn-closer");
let btnSave = document.querySelector(".btn-save");

function editElement(index) {
  mainModal.style.display = "block";
  let data = JSON.parse(localStorage.getItem("name"));
  EditName.value = data[index].name;
  EditEmail.value = data[index].email;
  EditImageUrl.value = data[index].imageUrl;
  EditPhone.value = data[index].phone;

  EditName.setAttribute("id", index);
}
btnCloser.addEventListener("click", () => {
  mainModal.style.display = "none";
  wrapper.style.opacity = "1";
  wrapper.style.transition = "1s";
});
btnSave.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("name"));
  let index = EditName.id;
  wrapper.style.opacity = "1";
  wrapper.style.transition = "1s";
  if (!EditName.value.trim()) {
    alert("Заполните поле!");
    return;
  }

  let editedTask = {
    name: EditName.value,
    email: EditEmail.value,
    imageUrl: EditImageUrl.value,
    phone: EditPhone.value,
  };
  data.splice(index, 1, editedTask);
  localStorage.setItem("name", JSON.stringify(data));
  mainModal.style.display = "none";
  createElement();
});
