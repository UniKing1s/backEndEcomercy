import express, { urlencoded } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import products from "./router/products.js";
import accounts from "./router/accounts.js";
import mongoose from "mongoose";
import "dotenv/config.js";
import multer from "multer";
import path from "path";
import { mkdirp } from "mkdirp";
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
// use to show image
app.use(express.static("public"));
////sử dụng multer để sử lí upload file
// Tạo thư mục upload
const uploadDir = path.join(process.cwd(), "public/images");
mkdirp.sync(uploadDir);
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
app.use(multer({ storage }).single("image"));

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
