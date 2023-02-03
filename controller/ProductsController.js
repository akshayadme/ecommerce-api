const Products = require("../models/ProductsModel");

// controller to add product to db

const addProduct = async (req, res) => {
  try {
    const productExist = await Products.find({ name: req.body.name });

    if (productExist.length === 1) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.json({ error: "Product Already Exist!" });
    } else {
      const newProduct = new Products(req.body);
      const product = await newProduct.save();

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({ data: { product } });
    }
  } catch (error) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.json({ error });
  }
};

// controller to fetch products from db

const getProduct = async (req, res) => {
  try {
    const productExist = await Products.find({});
    if (productExist.length > 0) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({ data: { products: productExist } });
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.json({ error: "Products not Found!" });
    }
  } catch (error) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.json({ error: error });
  }
};

// controller to update the quantity of product using its ID

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { number, operator } = req.query;

  try {
    // update parameters for find and update
    const filter = { _id: id };
    const options = { new: true };
    let updateDoc;
    if (operator === "increment") {
      updateDoc = { $inc: { quantity: number } };
    } else {
      updateDoc = { $inc: { quantity: -number } };
    }

    const result = await Products.findOneAndUpdate(
      filter,
      updateDoc,
      options
    ).exec();

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      data: {
        product: result,
        message: "Product updated successfully!",
      },
    });
  } catch (error) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.json({ error: error });
  }
};

// controller to delete the product by its ID

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const productExist = await Products.findById({ _id: id });
    if (productExist) {
      await Products.deleteOne({ _id: id });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({ data: { message: "Product Deleted!" } });
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.json({ error: "Product not Found!" });
    }
  } catch (error) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.json({ error: error });
  }
};

module.exports = {
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
