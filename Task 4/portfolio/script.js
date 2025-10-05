/* ================================
   Portfolio Website - Combined JS
   ================================ */

// ---------- Navbar Toggle ----------
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// ---------- To-Do List (LocalStorage) ----------
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

if (addTaskBtn) {
  addTaskBtn.addEventListener("click", addTask);
  document.addEventListener("DOMContentLoaded", loadTasks);
}

function addTask() {
  const task = taskInput.value.trim();
  if (task === "") return alert("Please enter a task!");
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${task}</span>
    <button onclick="deleteTask(this)">❌</button>
  `;
  taskList.appendChild(li);
  saveTasks();
  taskInput.value = "";
}

function deleteTask(btn) {
  btn.parentElement.remove();
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll("li span").forEach(span => {
    tasks.push(span.textContent);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task}</span>
      <button onclick="deleteTask(this)">❌</button>
    `;
    taskList.appendChild(li);
  });
}

// ---------- Product Filter & Sort ----------
const filterBtns = document.querySelectorAll(".filter-btn");
const sortSelect = document.getElementById("sortSelect");
const productGrid = document.getElementById("productGrid");

if (filterBtns.length && sortSelect && productGrid) {
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category;
      filterProducts(category);
    });
  });

  sortSelect.addEventListener("change", () => {
    sortProducts(sortSelect.value);
  });
}

function filterProducts(category) {
  const products = document.querySelectorAll(".product-card");
  products.forEach(product => {
    if (category === "all" || product.classList.contains(category)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

function sortProducts(criteria) {
  const products = Array.from(document.querySelectorAll(".product-card"));
  const sorted = products.sort((a, b) => {
    const aRating = parseFloat(a.dataset.rating);
    const bRating = parseFloat(b.dataset.rating);
    const aPrice = parseFloat(a.dataset.price);
    const bPrice = parseFloat(b.dataset.price);

    if (criteria === "price-low") return aPrice - bPrice;
    if (criteria === "price-high") return bPrice - aPrice;
    if (criteria === "rating") return bRating - aRating;
    return 0;
  });
  productGrid.innerHTML = "";
  sorted.forEach(p => productGrid.appendChild(p));
}

// ---------- Fetch GitHub Projects (Optional) ----------
const GITHUB_USERNAME = "yourusername"; // change this to your GitHub username
const repoContainer = document.getElementById("repos");

async function fetchGitHubProjects() {
  if (!repoContainer) return;
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
    const data = await res.json();
    repoContainer.innerHTML = data
      .filter(r => !r.fork)
      .slice(0, 6)
      .map(r => `
        <div class="product-card">
          <h3>${r.name}</h3>
          <p>${r.description || "No description available"}</p>
          <a class="btn" href="${r.html_url}" target="_blank">View on GitHub</a>
        </div>
      `).join('');
  } catch (err) {
    console.error("GitHub API error:", err);
  }
}
fetchGitHubProjects();
