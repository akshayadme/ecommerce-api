//--------- Configure Environment Variables Gloally on Project --------- //
require("dotenv").config();

// --------Importing DB Configuration----------- //
require("./config/mongoose");

//----------- Importing Modules -----------//
const express = require("express");
const bodyParser = require("body-parser");
const ProductsRoutes = require("./routes/ProductsRoutes");
const PORT = process.env.PORT || 3000;

const app = express();

//------BodyParser--------//
app.use(bodyParser.json());

//-----Routes---------//
app.use(ProductsRoutes);

app.listen(
  PORT,
  console.log(
    `Server started on port ${PORT}, on this link: http://localhost:${PORT}`
  )
);
