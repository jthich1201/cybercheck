let token = await localStorage.getItem("token");
if (token) {
  axios
    .get("http://localhost:3000/testingJWT")
    .headers({ Authorization: `Bearer ${token}`})
    .then((x) => console.log(x))
    .catch((err) => conosole.log(err)); 
}