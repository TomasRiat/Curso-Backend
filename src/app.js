import express from "express";
import config from "./config.js";

const app = express();

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
