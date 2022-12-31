const jwt = require("jsonwebtoken");

module.exports = async (request, response, next) => {
  try {

    const decodedToken = await jwt.verify(request.cookies.TOKEN, process.env.secretKey);
    
    const user = await decodedToken;

    request.user = user;

    next();
    
  } catch (error) {
    response.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};

