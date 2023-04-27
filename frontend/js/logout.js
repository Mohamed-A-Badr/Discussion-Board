function logout() {
  token = localStorage.getItem("token");

  fetch("http://127.0.0.1:8000/api/v1/dj-rest-auth/logout/", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        localStorage.removeItem("token");
        redirectHomePage();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
function redirectHomePage() {
  window.location.href = "../html/home.html";
}
