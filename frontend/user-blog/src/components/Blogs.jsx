import axios from 'axios'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Blogs() {
    const [allBlogs, setAllBlogs] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3000/api/blog/')
            .then(res => { setAllBlogs(res.data.blogs) })
            .catch(error => {
                console.log("Error: ", error);
            })
    }, [])

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3000/api/blog/${id}`)
        setAllBlogs((blogs) => blogs.filter((blog) => blog._id !== id))
    }

    return (
        <div>
            < h1 className='text-center bg-red-400 my-2 text-2xl py-2 hover:text-amber-300' > <Link to='/blogs/create'>Create New BLog</Link></h1 >
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-black p-4 bg-amber-300 '>
                {allBlogs && allBlogs.map((item, index) => {
                    return (
                        <div key={index} className='h-auto text-black text-2xl rounded-2xl bg-amber-200 p-3.5'>
                            <div>Title: {item.title}</div>
                            <div>Description: {item?.description}</div>
                            <div className='flex justify-between'>
                                <button
                                    onClick={() => { navigate(`/blogs/update/${item._id}`) }}
                                    className='bg-yellow-950 text-white p-2 rounded'
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => { handleDelete(item._id) }}
                                    className='bg-yellow-950 text-white p-2 rounded'
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}
