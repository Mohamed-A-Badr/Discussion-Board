const token = localStorage.getItem("token");
document.addEventListener("DOMContentLoaded", function () {
  const loggedInSection = document.getElementsByClassName("loginSection");
  const loggedOutSection = document.getElementsByClassName("logoutSection");

  console.log(token);

  if (token) {
    fetch("http://localhost:8000/api/v1/users", {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        var greet = document.getElementById("greeting");
        if (res.ok) {
          res.json().then((data) => {
            console.log(data);
            greet.innerHTML = "Welcome " + data.username;
          });
        } else {
          greet.innerHTML = "Welcome " + data.username;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    loggedInSection.item(0).style.display = "none";
    loggedOutSection.item(0).style.display = "block";
  } else {
    loggedInSection.item(0).style.display = "block";
    loggedOutSection.item(0).style.display = "none";
  }
});
