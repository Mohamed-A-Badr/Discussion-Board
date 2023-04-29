const token = localStorage.getItem("token");
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

const urlParams = new URLSearchParams(window.location.search);
const boardId = urlParams.get("boardId");

window.onload = function () {
  if (token) {
    const topicContainer = document.getElementById("topic-container");
    const newTopicAncher = `<a href="../html/new_topic.html?boardId=${boardId}" class="btn btn-primary">New Topic</a>`;
    topicContainer.insertAdjacentHTML("afterbegin", newTopicAncher);
  }
};

const table_content = document.getElementsByClassName("topic-content");

fetch(`http://127.0.0.1:8000/api/v1/boards/${boardId}/topics/`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      console.log("Someting went wrong!");
    }
  })
  .then((data) => {
    const topic_data = Array.from(data);
    topic_data.forEach((element) => {
      const table_row = document.createElement("tr");

      // Topic data
      const table_topic = document.createElement("td");
      const ancher_topic = document.createElement("a");
      ancher_topic.setAttribute("data-topic-id", element.id);
      ancher_topic.classList.add("link-primary");
      ancher_topic.classList.add("text-decoration-none");
      ancher_topic.innerHTML = element.subject;

      // redirect to Post page
      ancher_topic.style.cursor = "pointer";
      ancher_topic.addEventListener("click", function () {
        const topicId = this.getAttribute("data-topic-id");
        redirectToPostPage(topicId);
      });

      table_topic.appendChild(ancher_topic);

      const table_created_by = document.createElement("td");
      table_created_by.innerHTML = element.created_by;

      const table_post = document.createElement("td");
      table_post.innerHTML = "#";

      const table_views = document.createElement("td");
      table_views.innerHTML = "#";

      const table_created_dt = document.createElement("td");
      table_created_dt.innerHTML = element.created_dt;

      // appending all data to table row
      table_row.appendChild(table_topic);
      table_row.appendChild(table_created_by);
      table_row.appendChild(table_post);
      table_row.appendChild(table_views);
      table_row.appendChild(table_created_dt);

      // appending table row to table content
      table_content.item(0).appendChild(table_row);
    });
  });

function redirectToTopicPage(topicdId) {
  url = `../html/posts.html?topicId=${topicId}`;
  window.location.href = url;
}
