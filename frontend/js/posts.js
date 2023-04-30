const token = localStorage.getItem("token");

//? Navigation Bar

document.addEventListener("DOMContentLoaded", function () {
  const loggedInSection = document.getElementsByClassName("loginSection");
  const loggedOutSection = document.getElementsByClassName("logoutSection");

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

//? Content Fetching
document.addEventListener("DOMContentLoaded", function () {
  // The big container
  const postContainer = document.getElementById("post-container");

  // Reply button
  const ancherReply = document.createElement("a");
  ancherReply.classList.add("btn");
  ancherReply.classList.add("btn-primary");
  ancherReply.classList.add("mt-2");
  ancherReply.classList.add("mb-2");
  ancherReply.innerHTML = "Reply";

  //? adding the button to the big container
  postContainer.appendChild(ancherReply);

  const urlParams = new URLSearchParams(window.location.search);
  const boardId = urlParams.get("boardId");
  const topicId = urlParams.get("topicId");

  ancherReply.addEventListener("click", function () {
    window.location.href = `../html/new_post.html?boardId=${boardId}&topicId=${topicId}`;
  });

  fetch(
    `http://127.0.0.1:8000/api/v1/boards/${boardId}/topics/${topicId}/posts/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Something went wrong!");
      }
    })
    .then((data) => {
      const postData = Array.from(data);
      postData.forEach((Element) => {
        // card container
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card");
        cardContainer.classList.add("mb-2");

        // card body
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        cardBody.classList.add("p-3");

        // card content row
        const rowContent = document.createElement("div");
        rowContent.classList.add("row");

        // card picture column container
        const imgCol = document.createElement("div");
        imgCol.classList.add("col-2");

        // card picture
        const img = document.createElement("img");
        img.setAttribute("src", "../assets/user.png");
        img.setAttribute("alt", Element.created_by);
        img.classList.add("w-100");

        //? Adding picture to container
        imgCol.appendChild(img);

        // card content container
        const contentContainer = document.createElement("div");
        contentContainer.classList.add("col-10");

        // card content row
        const contentRow = document.createElement("div");
        contentRow.classList.add("row");
        contentRow.classList.add("mb-3");

        // content username column
        const usernameCol = document.createElement("div");
        usernameCol.classList.add("col-6");
        // username text
        const usernameText = document.createElement("strong");
        usernameText.classList.add("text-muted");
        usernameText.innerHTML = Element.created_by;

        //? adding username text to username column
        usernameCol.appendChild(usernameText);

        //? adding username column to content row
        contentRow.appendChild(usernameCol);

        // Created Date Column
        const contentDate = document.createElement("div");
        contentDate.classList.add("col-6");
        contentDate.classList.add("text-right");

        // Created Date text
        const dateText = document.createElement("small");
        dateText.classList.add("text-muted");
        dateText.innerHTML = Element.created_dt;

        //? Adding created date text to its column
        contentDate.appendChild(dateText);

        //? adding created date column to content row
        contentRow.appendChild(contentDate);

        // post content
        const postContent = document.createElement("p");
        postContent.textContent = Element.content;

        //? Adding content row to content container
        contentContainer.appendChild(contentRow);

        //?  Adding post content to content container
        contentContainer.appendChild(postContent);

        //? Adding Image and content container to card row content
        rowContent.appendChild(imgCol);
        rowContent.appendChild(contentContainer);

        //? Adding content row to card body
        cardBody.appendChild(rowContent);

        //? Adding card body to card container
        cardContainer.appendChild(cardBody);

        //? Adding card container to big container (post container)
        postContainer.appendChild(cardContainer);
      });
    });
});
