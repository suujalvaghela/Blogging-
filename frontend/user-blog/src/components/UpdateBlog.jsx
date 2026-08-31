import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function UpdateBlog() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/blog/${id}`)
      .then(res => {
        setTitle(res.data.blog.title)
        setDescription(res.data.blog.description)
      })
      .catch(err => {
        console.log(err.response.data.message)
      })
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()

    axios
      .patch(`http://localhost:3000/api/blog/${id}`, {
        title,
        description
      })
      .then(res => {
        navigate('/blogs')
      })
      .catch(err => {
        setError(err.response.data.message)
      })
  }

  return (
    <div className='bg-green-400 flex items-center justify-center  rounded-xl my-5 mx-100 py-5'>
      <form onSubmit={handleSubmit} className="">
        <div className='text-center font-mono text-2xl flex gap-5'>
          <div className=''>
            <label htmlFor="title">Title*</label>
            <input
              type="text"
              className='ml-5 bg-white rounded-xl pl-2'
              id="title"
              name='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              className='ml-5 bg-white rounded-xl pl-2'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-5 text-center">
          <button type="submit" className="bg-black rounded-xl text-white p-3">
            Update
          </button>
        </div>
      </form>
    </div>
  )
}
