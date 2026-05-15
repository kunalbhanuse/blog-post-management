import mongoose from "mongoose";
import ApiError from "../../common/utils/ApiError.js";
import ApiResponse from "../../common/utils/ApiResponse.js";
import Blog from "./blog.model.js";
import { blogSchema, blogUpdateSchema } from "./dto/blog.dto.js";

export const createBlog = async (req, res) => {
  try {
    const validatedReqBody = await blogSchema.parseAsync(req.body);
    const {
      title,
      authorName,
      email,
      category,
      tags,
      status,
      thumbnail,
      shortDescription,
      content,
    } = validatedReqBody;

    const blog = await Blog.create({
      title,
      authorName,
      email,
      category,
      tags,
      status,
      thumbnail,
      shortDescription,
      content,
    });
    return ApiResponse.created(res, "Blog Created SuccessFully ", blog);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw ApiError.badRequest("Invalid blog ID");
    }
    const blog = await Blog.findById(id);
    if (!blog) {
      throw ApiError.notFound("Blog not Found");
    }
    return ApiResponse.ok(res, "Blog featched Successfully", blog);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw ApiError.badRequest("Invalid blog ID");
    }
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      throw ApiError.notFound("Blog Delete Failed");
    }
    return ApiResponse.ok(res, "Blog Deleted Successfully", blog);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw ApiError.badRequest("invalid blog id");
    }
    const validatedReqBody = await blogUpdateSchema.parseAsync(req.body);

    const blog = await Blog.findById(id);
    if (!blog) {
      throw ApiError.notFound("Blog Not Found");
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, validatedReqBody, {
      new: true,
    });
    if (!updatedBlog) {
      throw ApiError.badRequest("blog update failed");
    }
    return ApiResponse.ok(res, "Blog Updated successfully ", updatedBlog);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
};
