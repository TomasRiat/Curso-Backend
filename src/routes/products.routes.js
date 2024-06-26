import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";
import config from "../config.js";

const router = Router();
const productManager = new ProductManager(`${config.DIRNAME}/product.json`);

router.get("/", (req, res) => {
  const limit = parseInt(req.query.limit);
  const products = productManager.getProducts(limit);
  res.json(products);
});

router.get("/:pid", (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = productManager.getProductById(productId);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
  } else {
    res.json(product);
  }
});

router.post("/", (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.body;
  const newProduct = productManager.addProduct(req.body);
  res.status(201).json(newProduct);
  const socketServer = req.app.get("socketServer");
  socketServer.emit("newProduct", req.body);
});

router.put("/:pid", (req, res) => {
  const productId = parseInt(req.params.pid);
  const fieldsToUpdate = req.body;
  const updatedProduct = productManager.updateProduct(
    productId,
    fieldsToUpdate
  );
  if (!updatedProduct) {
    res.status(404).json({ message: "Product not found" });
  } else {
    res.json(updatedProduct);
  }
});

router.delete("/:pid", (req, res) => {
  const productId = parseInt(req.params.pid);
  productManager.deleteProduct(productId);
  res.status(204).end();
});

export default router;
