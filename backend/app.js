import express from 'express'
import cors from 'cors'
import userRouter from './modules/user/user.route.js'
import blogRouter from './modules/blog/blog.route.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/user', userRouter)
app.use('/api/blog', blogRouter)

export default app