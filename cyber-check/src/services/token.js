let token = await localStorage.getItem("token");
if (token) {
  axios
    .get("http://192.168.1.3:3001/testingJWT")
    .headers({ Authorization: `Bearer ${token}`})
    .then((x) => console.log(x))
    .catch((err) => conosole.log(err)); 
}