import express, { urlencoded } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import products from "./router/products.js";
import accounts from "./router/accounts.js";
import mongoose from "mongoose";
import "dotenv/config.js";
const app = express();
// const url = `${process.env.MongoDB_url}`;
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extends: true, limit: "30mb" }));
app.use(
  cors({
    origin: ["https://front-end-ecommerce-black.vercel.app"],
    methods: ["POST", "PUT", "GET", "DELETE"],
    credentials: true,
  })
);
// , {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
mongoose
  .connect(`${process.env.MongoDB_url}`)
  .then(() => {
    console.log("connected to db");
    app.listen(5000, () => console.log(`server is runing`));
  })
  .catch(() => {
    console.log("connected fail");
  });
app.use("/products", products);
app.use("/accounts", accounts);
// app.use("/product", products);
// app.use("/product", products);
