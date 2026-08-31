import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import MainNavigation from "./components/MainNavigation"
import Blogs from "./components/Blogs"
import BlogForm from "./components/BlogForm"
import Login from "./components/Login"
import UpdateBlog from "./components/UpdateBlog"

const router = createBrowserRouter([
  {
    path: '/', element: <MainNavigation />, children: [
      { path: '/', element: <Home /> },
      { path: '/blogs', element: <Blogs /> },
      { path: '/blogs/create', element: <BlogForm /> },
      { path: '/login', element: <Login /> },
      { path: '/blogs/update/:id', element: <UpdateBlog /> },
    ]
  },
])

function App() {

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
