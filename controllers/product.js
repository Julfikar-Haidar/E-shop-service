import Product from "../models/product.js";
import mongoose from "mongoose";
import Category from '../models/category.js';


export const createProduct = async (req, res) => {

  if (!mongoose.Types.ObjectId.isValid(req.body.category)) {
    return res.status(404).json({ message: `Invalid category` });
  }
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    richDescription: req.body.richDescription,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
    countInStock: req.body.countInStock
  });

  try {
    await product.save();
     res.status(201).json(product);
  } catch (error) {
     res.status(500).json({
      error: error,
      success: false
    });
  }
};

export const getProducts = async (req, res) => {
  const { page } = req.query;
  try {
    const limit = 6;
    const startIndex = (Number(page) - 1) * limit;
    const total = await Product.countDocuments({});
    const category = await Product.find().populate('category').select('name image').limit(limit).skip(startIndex);
    res.json({
      data: category,
      currentPage: Number(page),
      totalProduct: total,
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};


export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id).populate('category');
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};


export const updateProduct = async (req, res) => {
  const { id } = req.params
  const { name, description, richDescription, image, images, brand, price, category,countInStock,rating,numReviews,isFeatured } = req.body
  try {
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(404).json({ message: `Invalid category`})
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(404).json({ message: `Invalid product id`})
        }
    const updateProduct = {
      name, description, richDescription, image, images, brand, price, category,countInStock,rating,numReviews,isFeatured,_id:id
    }
    await Product.findByIdAndUpdate(id, updateProduct, {new: true})
    res.status(200).json({ message: `Product updated successfully updated`,updateProduct})
  } catch (error) {
    return res.status(404).json({ message: `Something went wrong`})
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No product exist` });   
    }
    await Product.findByIdAndRemove(id)
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong",error: error });
  }
}

export const getProductCount = async (req, res) => {
    
    try {
      const  productCount = await Product.countDocuments({})
      res.status(200).json({ productCount: productCount });
    } catch (error) {
      res.status(400).json({ message: "Something went wrong",error: error });
    }
}


export const getFeaturedProducts = async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  try {
    const products = await Product.find({ isFeatured: true}).limit(+count)
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong",error: error });
  }
}