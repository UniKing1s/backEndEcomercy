// import multer from "multer";
import fs from "fs";
import { productModel } from "../models/productModel.js";
import path from "path";
import { mkdirp } from "mkdirp";
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

export const createProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    console.log("body");
    console.log(req.body);
    console.log("file");
    console.log(req.files);
    const maxMaSp = await productModel.find().sort({ masp: -1 }).limit(1);
    if (!maxMaSp[0]) {
      console.log("k có max mã");
      newProduct["masp"] = 1;
      console.log(maxMaSp[0]);
    } else {
      console.log("có max mã");
      console.log(maxMaSp[0]);
      newProduct["masp"] = Number(maxMaSp[0].masp) + 1;
    }
    // newProduct["img"] = filename;
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
export const createImage = async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).send("No file uploaded");
      console.log("no file to upload");
      return;
    }
    console.log(req.file);
    // console.log("1");
    // Lưu file ảnh vào thư mục upload
    const filename = req.file.filename;
    console.log(req.file.filename);

    // Trả về thông báo thành công
    res.status(200).json({
      success: true,
      filename: filename,
    });
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
export const getSearchProduct = async (req, res) => {
  try {
    const productsObject = req.body;
    console.log(productsObject);
    const products = await productModel.find({
      name: { $regex: productsObject.name, $options: "i" },
    });
    // { name: { $regex: 'TP Hồ Chí Minh', $options: 'i' } }
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
