const token = localStorage.getItem("token");

const urlParams = new URLSearchParams(window.location.search);
const boardId = urlParams.get("boardId");

window.addEventListener("DOMContentLoaded", function () {
  const buttonBlock = this.document.getElementById("button-block");
  const ancherRedirect = this.document.createElement("a");
  ancherRedirect.setAttribute("href", `../html/topics.html?boardId=${boardId}`);
  ancherRedirect.classList.add("btn");
  ancherRedirect.classList.add("btn-primary");
  ancherRedirect.innerHTML = "Return";
  buttonBlock.appendChild(ancherRedirect);
});

function newTopic() {
  const subject = document.getElementById("subject").value;
  const topicData = {
    subject: subject,
  };
  console.log(JSON.stringify(topicData));
  fetch(`http://127.0.0.1:8000/api/v1/boards/${boardId}/topics/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(topicData),
  })
    .then((res) => {
      if (res.status === 201) {
        alert("Topic created successfully!");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
