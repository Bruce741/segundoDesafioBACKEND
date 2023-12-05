const fs = require("fs");

class ProductManager {
  constructor() {
    this.path = "./productos.json";
    this.products = [];
  }

  static id = 0;

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    ProductManager.id++;
    let newProduct = {
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
      id: ProductManager.id,
    };

    this.products.push(newProduct);

    await fs.promises.writeFile(this.path, JSON.stringify(this.products));
  };

  getProducts = async () => {
    let productosLeidos = await fs.promises.readFile(this.path, "utf-8");
    return JSON.parse(productosLeidos);
  };

  getProductsById = async (id) => {
    let productos = await this.getProducts();
    let productoId = productos.find((producto) => producto.id == id);
    console.log(productoId);
  };

  updateProduct = async (id, update) => {
    let productos = await this.getProducts();
    let index = productos.findIndex((producto) => producto.id == id);

    productos[index] = {
      ...productos[index],
      ...update,
      id: id,
    };

    await fs.promises.writeFile(this.path, JSON.stringify(productos));
  };

  deleteProduct = async (id) => {
    let productos = await this.getProducts();
    let productosBorrados = productos.filter((producto) => producto.id != id);
    await fs.promises.writeFile(this.path, JSON.stringify(productosBorrados));
  };
}

const products = new ProductManager();

products.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
products.addProduct(
  "producto prueba2",
  "Este es un producto prueba2",
  250,
  "Sin imagen",
  "abc124",
  26
);
products.addProduct(
  "producto prueba3",
  "Este es un producto prueba3",
  300,
  "Sin imagen",
  "abc125",
  27
);
products.addProduct(
  "producto prueba4",
  "Este es un producto prueba4",
  350,
  "Sin imagen",
  "abc126",
  28
);
