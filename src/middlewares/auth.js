// creation of a middleware file and then having the logic in that file
const adminAuth = (req, res, next) => {
    console.log("authentication checking");
    let token = "xyz";
    if (token!="xyz") {
      res.status(401).send("Unauthorized request");
    }
    next();
}

const userAuth = (req, res, next) => {
  let token = "abc";
  if (token!="abc") {
    res.status(401).send("Unauthorized request");
  }
  next();
}

module.exports = {
    adminAuth,
    userAuth
}