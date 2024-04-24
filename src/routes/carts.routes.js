import { Router } from "express";
import CartManager from "../controllers/CartManager.js";

const router = Router();
const cartManager = new CartManager();

router.post("/", (req, res) => {
  const newCart = cartManager.createCart();
  res.status(201).json(newCart);
});

router.get("/:cid", (req, res) => {
  const cartId = parseInt(req.params.cid);
  const cart = cartManager.getCartById(cartId);
  if (!cart) {
    res.status(404).json({ message: "Cart not found" });
  } else {
    res.json(cart);
  }
});

router.post("/:cid/product/:pid", (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);
  const quantity = parseInt(req.body.quantity) || 1;

  const cart = cartManager.getCartById(cartId);
  if (!cart) {
    res.status(404).json({ message: "Cart not found" });
    return;
  }

  cartManager.addProductToCart(cartId, productId, quantity);
  res.json(cart);
});

export default router;
