import Category from "../models/category.js";
import mongoose from "mongoose";

export const createCategory = async (req, res) => {
    const category = req.body;
    const newCategory = new Category({
      ...category
    });
  
    try {
      await newCategory.save();
      return res.status(201).json(newCategory);
    } catch (error) {
      res.status(400).json({ message: "Something went wrong" });
    }
  };


  export const getCategory = async (req, res) => {
    const { page } = req.query;
    try {
      const limit = 6;
      const startIndex = (Number(page) - 1) * limit;
      const total = await Category.countDocuments({});
      const category = await Category.find().limit(limit).skip(startIndex);
      res.json({
        data: category,
        currentPage: Number(page),
        totalCategory: total,
        numberOfPages: Math.ceil(total / limit),
      });
    } catch (error) {
      res.status(404).json({ message: "Something went wrong" });
    }
  };


  export const deleteCategory = async (req, res) => {
    const { id } = req.params
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: `No category exist` });   
      }
      await Category.findByIdAndRemove(id)
      return res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: "Something went wrong",error: error });
    }
  }


  export const updateCategory = async (req, res) => { 
    const { id } = req.params 
    const { name, color, icon } = req.body
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: `No  category exist`})
      }

      const updateCategory = {
        name, 
        color,
        icon,
        _id: id
      }

      await Category.findByIdAndUpdate(id, updateCategory, {new: true})
      return res.status(200).json({ message: `Category updated successfully `,updateCategory})
    } catch (error) {
      return res.status(404).json({ message: `Something went wrong`})
    }
  }