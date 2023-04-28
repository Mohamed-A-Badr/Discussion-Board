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

const table_content = document.getElementsByClassName("board-content");

fetch("http://127.0.0.1:8000/api/v1/boards/", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  },
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      console.log("Something went wrong");
    }
  })
  .then((data) => {
    console.log(data);
    const board_data = Array.from(data);
    board_data.forEach((element) => {
      console.log(element);
      console.log(element.name);
      console.log(element.description);
      const table_row = document.createElement("tr");

      // board data
      const table_board = document.createElement("td");
      const ancher_board = document.createElement("a");
      ancher_board.setAttribute("data-board-id", element.id);
      ancher_board.innerHTML = element.name;

      // redirect to topic page
      ancher_board.addEventListener("click", function () {
        const boardId = this.getAttribute("data-board-id");
        redirectToTopicPage(boardId);
      });

      const board_description = document.createElement("small");
      board_description.classList.add("d-block");
      board_description.classList.add("text-muted");
      board_description.innerHTML = element.description;
      table_board.appendChild(ancher_board);
      table_board.appendChild(board_description);

      // Post data
      const table_post = document.createElement("td");
      table_post.innerHTML = "#";

      // Topic data
      const table_topic = document.createElement("td");
      table_topic.innerHTML = "#";

      // Last post data
      const table_last_post = document.createElement("td");
      table_last_post.innerHTML = "#";

      // appending all data to table row
      table_row.appendChild(table_board);
      table_row.appendChild(table_post);
      table_row.appendChild(table_topic);
      table_row.appendChild(table_last_post);

      // appending table row to table content
      table_content.item(0).appendChild(table_row);
    });
  })
  .catch((err) => {
    console.log(err);
  });

function redirectToTopicPage(boardId) {
  url = `http://127.0.0.1:5500/frontend/html/topics.html?boardId=${boardId}`;
  window.location.href = url;
}
