// import multer from "multer";
import fs from "fs";
import { productModel } from "../models/productModel.js";

//get products

export const getProduct = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
    console.log("product", products);
    // console.log(res.data.accessToken);
  } catch (err) {
    res.status(500).json({ error: err });
    console.log("err");
  }
};
export const getProductById = async (req, res) => {
  try {
    const productsObject = req.body;
    console.log(productsObject);
    const products = await productModel.findById(productsObject._id);
    res.status(200).json(products);
    console.log("product", products);
    // console.log(req.body);
    // const book = await sachModel.findOne({ maSach: bookObject.maSach });
    // res.status(200).json(book);

    // console.log(res.data.accessToken);
  } catch (err) {
    res.status(500).json({ error: err });
    console.log("err");
  }
};
export const getProductByMaSp = async (req, res) => {
  try {
    const productsObject = req.body;
    console.log(productsObject);
    const products = await productModel.findOne({ masp: productsObject.masp });
    res.status(200).json(products);
    console.log("product", products);
    // console.log(req.body);
    // const book = await sachModel.findOne({ maSach: bookObject.maSach });
    // res.status(200).json(book);

    // console.log(res.data.accessToken);
  } catch (err) {
    res.status(500).json({ error: err });
    console.log("err");
  }
};

////upload img
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "upload/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + file.originalname);
//   },
// });

// const upload = multer({ storage: storage }).single("image");
// const doUploadFile = async (imgFile) => {
//   const img = imgFile.filename;
//   try {
//     await Image.create({ image: img });
//     console.log("Thêm ảnh thành công");
//     return true;
//   } catch (err) {
//     return false;
//     console.log("Thêm ảnh thất bại");
//   }
// };
//create product
export const createProduct = async (req, res) => {
  try {
    // const img = {
    //   data: fs.readFileSync("upload/", req.file.filename),
    //   contentType: "image/png",
    // };
    const newProduct = req.body;
    console.log(req.body);
    console.log(req.files);
    const maxMaSp = await productModel.find().sort({ masp: -1 }).limit(1);
    console.log(maxMaSp[0]);
    newProduct["masp"] = Number(maxMaSp[0].masp) + 1;
    // newProduct["img"] = img;
    console.log(newProduct);
    const product = new productModel(newProduct);
    await product.save();
    res.status(200).json(product);
    console.log("product", product);
  } catch (err) {
    res.status(500).json({ error: err });
    console.log("err");
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const deleteProduct = req.body;
    await productModel.deleteOne({ masp: deleteProduct.masp });
    // await product.save();
    res.status(200).json({ delete: "success" });
    console.log("deleted product");
    // console.log("product", product);
  } catch (err) {
    res.status(500).json({ error: err });
    console.log("err");
  }
};

//update product with masp
export const updateProduct = async (req, res) => {
  try {
    const updateProduct = req.body;
    const product = await productModel.findOneAndUpdate(
      { masp: updateProduct.masp },
      updateProduct,
      { new: true }
    );
    await product.save();
    res.status(200).json({ product });
    // console.log("product", product);
  } catch (err) {
    res.status(500).json({ error: err });
    console.log("err");
  }
};
