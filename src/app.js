import express from "express";
import handlebars from "express-handlebars";
import config from "./config.js";
import initSocket from "./sockets.js";
import viewsRouter from "./routes/views.routes.js";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/carts.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", `${config.DIRNAME}/views`);
app.set("view engine", "handlebars");

app.use("/", viewsRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/static", express.static(`${config.DIRNAME}/public`));

const expressInstance = app.listen(config.PORT, () => {
  console.log(`App activa en puerto ${config.PORT}`);
});
const socketServer = initSocket(expressInstance);
app.set("socketServer", socketServer);
