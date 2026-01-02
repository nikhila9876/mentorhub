document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Temporary admin credentials
  if (username === "admin" && password === "admin123") {
  localStorage.setItem("isAdminLoggedIn", "true");
  window.location.href = "admin-dashboard.html";
}

  else {
    document.getElementById("error").innerText = "Invalid admin credentials";
  }
});
// ADMIN DASHBOARD LOGIC
const form = document.getElementById("contentForm");
const contentList = document.getElementById("contentList");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const category = document.getElementById("category").value;
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    const data = JSON.parse(localStorage.getItem("mentorhub")) || [];

    data.push({ category, title, content });

    localStorage.setItem("mentorhub", JSON.stringify(data));

    form.reset();
    showContent();
  });
}


function showContent() {
  if (!contentList) return;

  const data = JSON.parse(localStorage.getItem("mentorhub")) || [];
  contentList.innerHTML = "";

  data.forEach(item => {
    const div = document.createElement("div");
    div.className = "course";
    div.innerHTML = `
      <h3>${item.category}: ${item.title}</h3>
      <p>${item.content}</p>
    `;
    contentList.appendChild(div);
  });
}

showContent();

// STEP 2: Show admin-added content on Courses page
const coursesContent = document.getElementById("coursesContent");

if (coursesContent) {
  const data = JSON.parse(localStorage.getItem("mentorhub")) || [];

  if (data.length === 0) {
    coursesContent.innerHTML = "<p>No content available yet.</p>";
  } else {
    data.forEach(item => {
      const div = document.createElement("div");
      div.className = "course";
      div.innerHTML = `
        <h3>${item.category} - ${item.title}</h3>
        <p>${item.content}</p>
      `;
      coursesContent.appendChild(div);
    });
  }
}
// STEP 3: Protect Admin Dashboard
if (window.location.pathname.includes("admin-dashboard.html")) {
  const isLoggedIn = localStorage.getItem("isAdminLoggedIn");

  if (isLoggedIn !== "true") {
    alert("Access denied. Please login as admin.");
    window.location.href = "admin-login.html";
  }
}
function logout() {
  localStorage.removeItem("isAdminLoggedIn");
  window.location.href = "admin-login.html";
}
