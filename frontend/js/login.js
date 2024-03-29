function login() {
  const curToken = localStorage.getItem("token");
  if (curToken) {
    console.log("Already logged in");
    alert("Already logged in");
    redirectHomePage();
    return;
  }

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const loginData = {
    email: email,
    password: password,
  };

  fetch(
    "https://badr3801-board-backend.herokuapp.com/api/v1/dj-rest-auth/login/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Login failed");
      }
    })
    .then((data) => {
      if (data && data.key) {
        console.log(data.key);
        localStorage.setItem("token", data.key);
        alert("Login successful");
        redirectHomePage();
      } else {
        alert("Login failed");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function redirectHomePage() {
  window.location.href = "../html/home.html";
}

window.addEventListener("DOMContentLoaded", function () {
  const curToken = localStorage.getItem("token");
  if (curToken) {
    redirectHomePage();
  }
});
