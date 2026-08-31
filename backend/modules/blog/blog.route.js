import { Router } from "express";
import { createBlog, deleteBlog, getAllBlogs, getBlog, updateBlog } from "./blog.controller.js";

const router = Router();

router.route("/").post(createBlog)
router.route("/").get(getAllBlogs)
router.route("/:id").get(getBlog)
router.route("/:id").patch(updateBlog)
router.route("/:id").delete(deleteBlog)

export default router