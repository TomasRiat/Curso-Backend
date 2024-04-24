class CartManager {
  constructor() {
    this.carts = [];
    this.nextId = 1;
  }

  createCart() {
    const newCart = {
      id: this.nextId++,
      products: [],
    };
    this.carts.push(newCart);
    return newCart;
  }

  getCartById(id) {
    return this.carts.find((cart) => cart.id === id);
  }

  addProductToCart(cartId, productId, quantity = 1) {
    const cart = this.getCartById(cartId);
    if (!cart) {
      console.error("Cart not found");
      return;
    }

    const existingProduct = cart.products.find(
      (product) => product.id === productId
    );
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ id: productId, quantity });
    }

    return cart;
  }
}

const cartManager = new CartManager();

export default CartManager;
