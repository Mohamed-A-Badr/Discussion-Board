document.addEventListener("DOMContentLoaded", function () {
  // Retrieve token from localStorage
  const token = localStorage.getItem("token");

  // Get the elements to modify
  const loggedInSection = document.getElementsByClassName("loginSection");
  const loggedOutSection = document.getElementsByClassName("logoutSection");

  console.log(token);

  if (token) {
    // User is logged in, show the logged-in section
    loggedInSection.item(0).style.display = "none";
    loggedOutSection.item(0).style.display = "block";
  } else {
    // User is not logged in, show the logged-out section
    loggedInSection.item(0).style.display = "block";
    loggedOutSection.item(0).style.display = "none";
  }
});
