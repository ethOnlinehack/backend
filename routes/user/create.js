const User = require("../../models/User")

module.exports =  async  function(req, res) {
    const { email, password, first_name, last_name } = req.body;
    const userExists =  await User.findOne({email:email})
    console.log(userExists)
    if(userExists)
      return res.status(500).send("user already exists")
      
    const user = new User({ email, password, first_name, last_name });
    user.save(function(err) {
      if (err) {
        res.status(500)
          .send("Error registering new user please try again." + err);
      } else {
        res.status(200).send("Welcome to the club!");
      }
    });
  };