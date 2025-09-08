// ------------------- Contact Form Validation -------------------
let form = document.querySelector("#registrationForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;

  // Name field Validation
  let name = document.getElementById("name");
  let nameFieldValue = name.value.trim();
  let nameFieldErrorMessage = document.getElementById("nameFieldErrorMessage");

  if (nameFieldValue.length < 3 || nameFieldValue.length > 20) {
    nameFieldErrorMessage.innerText = "Please enter a valid name (3–20 chars)";
    name.style.border = "2px solid red";
    isValid = false;
  } else {
    nameFieldErrorMessage.innerText = "";
    name.style.border = "2px solid black";
  }

  // Email field Validation
  let email = document.getElementById("email");
  let emailFieldValue = email.value.trim();
  let emailFieldErrorMessage = document.getElementById("emailFieldErrorMessage");
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!regex.test(emailFieldValue)) {
    emailFieldErrorMessage.innerText = "Please enter a valid email";
    email.style.border = "2px solid red";
    isValid = false;
  } else {
    emailFieldErrorMessage.innerText = "";
    email.style.border = "2px solid black";
  }

  // Phone field Validation
  let phone = document.getElementById("phone");
  let phoneFieldValue = phone.value.trim();
  let phoneFieldErrorMessage = document.getElementById("phoneFieldErrorMessage");

  if (phoneFieldValue.length != 10 || isNaN(phoneFieldValue)) {
    phoneFieldErrorMessage.innerText = "Please enter a 10-digit number";
    phone.style.border = "2px solid red";
    isValid = false;
  } else {
    phoneFieldErrorMessage.innerText = "";
    phone.style.border = "2px solid black";
  }

  // Success message
  if (isValid) {
    alert("Contact Details Received Successfully ✔️");
    form.reset();
  }
});

// ------------------- To-Do List -------------------
let toDoList = document.getElementById("taskList");
let taskForm = document.getElementById("list");
let taskInput = document.getElementById("taskInput");

// Function to add a task
function addTask(task) {
  let listItem = document.createElement("li");

  listItem.innerHTML = `
    <input type="checkbox" />
    <span>${task}</span>
    <button>❌</button>
  `;

  toDoList.appendChild(listItem);
}

// Handle form submission
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let task = taskInput.value.trim();

  if (task !== "") {
    addTask(task);
    taskInput.value = ""; 
  }
});

// Handle delete + complete toggle
toDoList.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    // Delete task
    let listItem = event.target.parentElement;
    toDoList.removeChild(listItem);
  }

  if (event.target.tagName === "INPUT" && event.target.type === "checkbox") {
    // Toggle completed
    let span = event.target.nextElementSibling;
    if (event.target.checked) {
      span.style.textDecoration = "line-through";
      span.style.color = "gray";
    } else {
      span.style.textDecoration = "none";
      span.style.color = "black";
    }
  }
});
