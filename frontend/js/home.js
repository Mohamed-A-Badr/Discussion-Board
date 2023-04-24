fetch("http://127.0.0.1:8000/api/v1/")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
