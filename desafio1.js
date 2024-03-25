class ProductManager {
  constructor() {
    this.products = [];
    this.id = 1;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Todos los campos son obligatorios");
      return;
    }

    if (this.products.some((product) => product.code === code)) {
      console.error("Ya existe un producto con ese codigo");
      return;
    }

    const product = {
      id: this.id++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products.push(product);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      console.error("Producto no encontrado");
    }
    return product;
  }
}

const productManager = new ProductManager();

productManager.addProduct(
  "Remera",
  "Remera de algodon",
  3000,
  "remera.jpg",
  5521,
  200
);
productManager.addProduct(
  "Campera",
  "Campera de abrigo",
  20000,
  "campera.jpg",
  3362,
  100
);
productManager.addProduct(
  "Zapatillas",
  "Zapatillas deportivas",
  50000,
  "zapatillas.jpg",
  2032,
  30
);

console.log(productManager.getProducts());
console.log(productManager.getProductById(2));
console.log(productManager.getProductById(4));
