const token = localStorage.getItem("token");

const urlParams = new URLSearchParams(window.location.search);
const boardId = urlParams.get("boardId");
const topicId = urlParams.get("topicId");

window.addEventListener("DOMContentLoaded", function () {
  const buttonBlock = this.document.getElementById("button-block");
  const ancherRedirect = this.document.createElement("a");
  ancherRedirect.setAttribute(
    "href",
    `../html/posts.html?boardId=${boardId}&topicId=${topicId}`
  );
  ancherRedirect.classList.add("btn");
  ancherRedirect.classList.add("btn-primary");
  ancherRedirect.innerHTML = "Return";
  buttonBlock.appendChild(ancherRedirect);
});

function newPost() {
  const content = document.getElementById("content").value;
  const postData = {
    content: content,
  };
  console.log(JSON.stringify(postData));
  fetch(
    `https://badr3801-board-backend.herokuapp.com/api/v1/boards/${boardId}/topics/${topicId}/posts/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(postData),
    }
  )
    .then((res) => {
      if (res.status === 201) {
        alert("Topic created successfully!");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
