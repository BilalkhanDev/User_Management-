const schemaValidation = require("../config/schemaValidation");
const jwt = require("jsonwebtoken");

const validator = (property, place = "body") => (req, res, next) => {
    const { error } = schemaValidation[property].validate(req[place], {
        abortEarly: false,
    });

    if (!error) {
        next();
    } else {
        const errorMessage = error.details.map(detail => detail.message).join('; ');
        res.status(400).json({ error: errorMessage });
    }
};


 const verifyToken = (req, res, next) => {
  // Check if the authorization header is present
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    // Extract the token from the authorization header
    const token = authHeader.split(" ")[1];

    // Verify the token
    jwt.verify(token,"1234567892532", (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Unauthorized",
          success: false,
          responseCode: 401,
        });
      } else {
        // Token is valid, store decoded token in request object
        req.decoded = decoded;
        req.userId = decoded.userId;
        console.log("Token verify",req.decoded)
        next();
      }
    });
  } else {
    // If there is no authorization header, return 401 Unauthorized
    return res.status(401).json({
      message: "Unauthorized",
      success: false,
      responseCode: 401,
    });
  }
};

module.exports={
    validator,
    verifyToken
}
