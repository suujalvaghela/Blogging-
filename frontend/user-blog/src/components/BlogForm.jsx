import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function BlogForm() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios
            .post("http://localhost:3000/api/blog/", { title, description })
            .then(res => {
                setMessage(res.data.message);
                setTitle("")
                setDescription("")
                navigate('/blogs')
            }
            )
            .catch(error => {
                console.log("Error: ", error);
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
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            className='ml-5 bg-white rounded-xl pl-2'
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-5 text-center">
                    <button type="submit" className="bg-black rounded-xl text-white p-3">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}
