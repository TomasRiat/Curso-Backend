import fs from "fs";

class CartManager {
  constructor() {
    this.carts = [];
    this.filePath = "cart.json";
    this.loadCarts();
  }

  loadCarts() {
    try {
      const data = fs.readFileSync(this.filePath, "utf8");
      this.carts = JSON.parse(data);
    } catch (error) {
      this.carts = [];
    }
  }

  saveCarts() {
    fs.writeFileSync(
      this.filePath,
      JSON.stringify(this.carts, null, 2),
      "utf8"
    );
  }

  createCart() {
    const newCart = {
      id: this.carts.length + 1,
      products: [],
    };
    this.carts.push(newCart);
    this.saveCarts();
    return newCart;
  }

  getCartById(id) {
    return this.carts.find((cart) => cart.id === id);
  }

  addProductToCart(cartId, productId, quantity = 1) {
    const cart = this.getCartById(cartId);
    if (!cart) {
      throw new Error("Cart not found");
    }

    const existingProduct = cart.products.find(
      (product) => product.id === productId
    );
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ id: productId, quantity });
    }

    this.saveCarts();
    return cart;
  }
}

export default CartManager;
