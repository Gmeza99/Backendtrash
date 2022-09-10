//Packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
var removeUst = require("remove-use-strict");


//Local
const routes = require('./network/routes.js');
const errHandler = require('./utils/middlewares/errorHandler.js');

//Enviroment Configurations
dotenv.config();
const { ENV, PORT } = process.env;

//App
const app = express();

//Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Headers
if (ENV == 'development') {
  console.log('Running on development');
} else {
  app.use(helmet());
}
app.use(cors());

//Error Handlers
app.use(errHandler);

//Routes
app.use(routes);

//API INICIAL
app.get('/', (req, res) => {

  res.send("SoftwareSistemas")
  //sad


});



app.listen(5000, () => {
  console.log(`Server on port 5000`);
});


