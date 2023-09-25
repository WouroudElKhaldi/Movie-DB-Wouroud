const users = require('../data/usersData');

// middleware for authentication
const userAuthent = (request, response, next) => {
    const { username, password } = request.headers;
    const userAuth = users.find(
      (user) => user.username === username && user.password === password
    );

    if (userAuth) {
      next();
    } else {
      response.status(403).json({ 
            status: 403, 
            error: true, 
            message: 'Unauthorized , wrong username or password' 
        });
    }
  };

module.exports = userAuthent;