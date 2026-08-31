import { User } from '../../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const signUp = async (req, res) => {
    const { name, email, password } = req.body

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All Fields are required" })
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Please provide valid email address" })
    }

    const user = await User.findOne({ email })

    if (user) {
        return res.status(400).json({ message: "This email is already registered" })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
        name,
        email,
        password: hashPassword
    })

    const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET)

    return res.status(201).json({ message: "User Registered Successfully", token })
}

export const login = async (req, res) => {
    const { email, password } = req.body

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email || !password) {
        return res.status(400).json({ message: "All Fields are required" })
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Please provide valid email address" })
    }

    const user = await User.findOne({ email })

    if (!user) {
        return res.status(400).json({ message: "This email is not registered" })
    }

    const isPassCorrect = await bcrypt.compare(password, user.password)

    if (!isPassCorrect) {
        return res.status(400).json({ message: "Wrong password" })
    }

    const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET)

    return res.status(201).json({ message: "User LoggedIn Successfully", token })
}

export const getUser = async (req, res) => {
    const id = req.params.id
    const user = await User.findById(id)
    if (!user) {
        return res.status(400).json({ message: "User Does not exist" })
    }

    const userResponse = user.toObject()
    delete userResponse.password
    return res.status(201).json({ message: "User Fetched Successfully", user: userResponse })
}

export const getAllUser = async (req, res) => {
    const users = await User.find({})
    return res.status(201).json({ message: "Users fetched Successfully", users })
}

export const deleteUser = async (req, res) => {
    const id = req.params.id
    await User.findByIdAndDelete(id)
    return res.status(201).json({ message: "Users Deleted Successfully" })
}