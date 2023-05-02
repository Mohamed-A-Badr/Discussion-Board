// JavaScript
function signup() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password1 = document.getElementById("password1").value;
  const password2 = document.getElementById("password2").value;

  if (password1 !== password2) {
    alert("Password does not match");
    return;
  }

  const signupData = {
    username: username,
    email: email,
    password1: password1,
    password2: password2,
  };

  fetch("http://127.0.0.1:8000/api/v1/dj-rest-auth/registration/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupData),
  })
    .then((response) => {
      if (response.status === 204) {
        alert("Signup successful!");
      } else {
        alert("Signup failed");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
