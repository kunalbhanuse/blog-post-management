import mongoose from "mongoose";
import ApiError from "../../common/utils/ApiError.js";
import ApiResponse from "../../common/utils/ApiResponse.js";
import Blog from "./blog.model.js";
import { blogSchema, blogUpdateSchema } from "./dto/blog.dto.js";
import { Parser } from "json2csv";

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

export const getAllBlog = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const search = req.query.search || "";
    const searchFilter = {
      $or: [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          authorName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
        {
          status: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    };

    const totalBlogs = await Blog.countDocuments(searchFilter);

    const blogs = await Blog.find(searchFilter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return ApiResponse.ok(res, "Blogs fetched successfully", {
      blogs,
      pagination: {
        totalBlogs,
        currentPage: page,
        totalPages: Math.ceil(totalBlogs / limit),
        limit,
      },
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
};

export const exportBlogsToCSV = async (req, res) => {
  try {
    const search = req.query.search || "";
    const searchFilter = {
      $or: [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          authorName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
        {
          status: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    };

    const blogs = await Blog.find(searchFilter).lean();
    const fields = [
      "title",
      "authorName",
      "email",
      "category",
      "status",
      "tags",
      "createdAt",
    ];
    const parser = new Parser({ fields });
    const csv = parser.parse(blogs);
    res.header("Content-Type", "text/csv");
    res.attachment("blogs.csv");
    return res.send(csv);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
};
