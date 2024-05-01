import fs from "fs";
import { Router } from "express";
import config from "../config.js";

const router = Router();

router.get("/products", (req, res) => {
  fs.readFile(`${config.DIRNAME}/product.json`, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Error al leer el archivo de productos" });
    }

    const products = JSON.parse(data);
    res.render("realtime_products", { products });
  });
});

router.get("/home", (req, res) => {
  fs.readFile(`${config.DIRNAME}/product.json`, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Error al leer el archivo de productos" });
    }

    const products = JSON.parse(data);
    res.render("home", { products: products });
  });
});

export default router;
