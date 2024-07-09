require('dotenv').config();
const schemaValidation = require("../config/schemaValidation");
const jwt = require("jsonwebtoken");
const secret_key=process.env.SECRET_KEY
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
  const authHeader = req.headers["authorization"];
  if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, secret_key, (err, decoded) => {
          if (err) {
              return res.status(401).json({
                  message: "Unauthorized",
                  success: false,
                  responseCode: 401,
              });
          } else {
              req.decoded = decoded;
              req.userId = decoded.userId;
              req.userRole=decoded.userRole
              next();
          }
      });
  } else {
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
