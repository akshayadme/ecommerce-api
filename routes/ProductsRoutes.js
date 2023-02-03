const productRouter = require("express").Router();

const {
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/ProductsController");

// For rendering different pages and controllers
productRouter.get("/products", getProduct);
productRouter.post("/products/create", addProduct);
productRouter.delete("/products/:id", deleteProduct);
productRouter.patch("/products/:id/update_quantity", updateProduct);

module.exports = productRouter;
