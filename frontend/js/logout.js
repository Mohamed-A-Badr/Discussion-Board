function logout() {
  token = localStorage.getItem("token");

  fetch(
    "https://badr3801-board-backend.herokuapp.com/api/v1/dj-rest-auth/logout/",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    }
  )
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
