import fs from "fs";

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = this.readProductsFromFile();
    this.nextId = this.calculateNextId();
  }

  readProductsFromFile() {
    try {
      const data = fs.readFileSync(this.path, "utf8");
      return JSON.parse(data);
    } catch (err) {
      console.error("Error al leer el archivo de productos:", err);
      return [];
    }
  }

  saveProductsToFile() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    } catch (err) {
      console.error("Error al guardar el archivo de productos:", err);
    }
  }

  calculateNextId() {
    return (
      this.products.reduce(
        (maxId, product) => (product.id > maxId ? product.id : maxId),
        0
      ) + 1
    );
  }

  addProduct(productData) {
    if (
      !productData.title ||
      !productData.description ||
      !productData.price ||
      !productData.thumbnail ||
      !productData.code ||
      !productData.stock
    ) {
      console.error("Todos los campos son obligatorios");
      return;
    }

    if (this.products.some((product) => product.code === productData.code)) {
      console.error("Ya existe un producto con ese codigo");
      return;
    }

    const product = {
      id: this.nextId++,
      ...productData,
    };
    this.products.push(product);
    this.saveProductsToFile();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      console.error("Producto no encontrado.");
    }
    return product;
  }

  updateProduct(id, updatedFields) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      console.error("Producto no encontrado.");
      return;
    }

    this.products[index] = { ...this.products[index], ...updatedFields };
    this.saveProductsToFile();
  }

  deleteProduct(id) {
    this.products = this.products.filter((product) => product.id !== id);
    this.saveProductsToFile();
  }
}

// const productManager = new ProductManager("./src/product.json");

// productManager.addProduct({
//   title: "Remera",
//   description: "Remera de algodon",
//   price: 3000,
//   thumbnail: "remera.jpg",
//   code: 5521,
//   stock: 200,
// });

// productManager.addProduct({
//   title: "Campera",
//   description: "Campera de abrigo",
//   price: 20000,
//   thumbnail: "campera.jpg",
//   code: 3362,
//   stock: 100,
// });

// productManager.addProduct({
//   title: "Zapatillas",
//   description: "Zapatillas deportivas",
//   price: 50000,
//   thumbnail: "zapatillas.jpg",
//   code: 2032,
//   stock: 30,
// });

export default ProductManager;
