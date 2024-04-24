import express from "express";
import config from "./config.js";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/carts.routes.js";

const app = express();

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
