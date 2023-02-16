import jwt from "jsonwebtoken";
export const generateToken = (email) => {
  const token = jwt.sign(
    { email }, //payload to be encrypted, we can store more here
    process.env.SECRET, //secret key from env
  );
}  
const login = (req, res) => {
	let { email, password } = req.body;
	// validate if proper user here
	let validUser = true;
	if (validUser) {
	  //here if user exists and put proper credentials
	  let token = generateToken(email);
	  res.status(200).send({ status: "successful login", token });
	} else {
	  //handle invalid user
	}
  };
  export const isAuth = (req, res, next) => {
	//get the header of the request
	const header = req.header("Authorization");
	//check if the header even exists, and if it does split on space (Bearer idoweibgiuejwgwiugs)
	if (header) {
	  const token = header?.split(" ")[1];
	  //verify token using the jwt.verify method passing in the token from the client
	  //and the key from .env so verufy could regenerate the token and see if it matches what the client provided us with
	  jwt.verify(token, process.env.SECRET + "", (err: any, payload: any) => {
		//verify takes a call back, err means the tokens didnt match
		//payload will be available if they matched, so we can access the payload if we need
		if (payload && payload.email) {
		  //this is optional, but i might wanna use the payload somehow
		  req.userEmail = payload.email;
		  //continue to the actual method, we are done with the middleware
		  next();
		} else {
		  res.status(403).send("forbidden");
		}
	  });
	} else {
	  res.status(403).send("forbidden");
	}
  };
  