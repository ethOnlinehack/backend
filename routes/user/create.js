const User = require("../../models/User")

module.exports =  function(req, res) {
    const { email, password } = req.body;
    const userExists = User.findOne({email:email})
    if(userExists)
      return res.status(500).send("user already exists")
      
    const user = new User({ email, password });
    user.save(function(err) {
      if (err) {
        res.status(500)
          .send("Error registering new user please try again." + err);
      } else {
        res.status(200).send("Welcome to the club!");
      }
    });
  };