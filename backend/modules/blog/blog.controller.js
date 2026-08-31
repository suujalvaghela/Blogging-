import { Blog } from '../../models/blog.js'

export const createBlog = async (req, res) => {
    try {
        const { title, description } = req.body
        if (!title) {
            return res.status(400).json({ message: "Title is Required" })
        }
        await Blog.create({ title, description })
        return res.status(200).json({ message: "Blog Created Successfully" })
    } catch (error) {
        return res.status(400).json({ message: "Wrong Request" })
    }
}

export const getAllBlogs = async (req, res) => {
    const blogs = await Blog.find({})
    return res.status(201).json({ message: "BLog fetched Successfully", blogs })
}

export const getBlog = async (req, res) => {
    try {
        const id = req.params.id
        const blog = await Blog.findById(id);
        return res.status(200).json({ message: "BLog Fetched", blog })
    } catch (error) {
        return res.status(400).json({ message: "Wrong Request" })
    }
}
export const updateBlog = async (req, res) => {
    try {
        const id = req.params.id
        const { title, description } = req.body
        await Blog.findByIdAndUpdate(id, { title, description })
        return res.status(200).json({ message: "BLog updated" })
    } catch (error) {
        return res.status(400).json({ message: "Wrong Request" })
    }
}

export const deleteBlog = async (req, res) => {
    const id = req.params.id
    await Blog.findByIdAndDelete(id);
    return res.status(200).json({ message: "BLog Deleted" })
}