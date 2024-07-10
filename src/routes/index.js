const Router = require("express").Router();

Router.use(require("./user"));
Router.use(require("./product"));



module.exports = Router;
