axios
  .get("http://localhost:3000/login")
  .then((x) => {
    if (x.status === "succesful login") {
		localStorage.setItem("token", x.token);
    }
  })
  .catch((x) => console.log("handle error here"));

