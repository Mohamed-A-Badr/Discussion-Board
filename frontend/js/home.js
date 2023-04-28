document.addEventListener("DOMContentLoaded", function () {
  // Retrieve token from localStorage
  const token = localStorage.getItem("token");

  // Get the elements to modify
  const loggedInSection = document.getElementsByClassName("loginSection");
  const loggedOutSection = document.getElementsByClassName("logoutSection");

  console.log(token);

  if (token) {
    // User is logged in, show the logged-in section
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
    // User is not logged in, show the logged-out section
    loggedInSection.item(0).style.display = "block";
    loggedOutSection.item(0).style.display = "none";
  }
});
