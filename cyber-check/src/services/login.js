const IP = process.env.IP;
axios
  .get(`http://192.168.1.3:3001/login`)
  .then((x) => {
    if (x.status === "succesful login") {
		localStorage.setItem("token", x.token);
    }
  })
  .catch((x) => console.log("handle error here"));

