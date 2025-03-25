import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import ErrorPage from '../error/ErrorPage'
import Register from '../auth/Register'
import Login from '../auth/Login'
import Home from '../pages/home/Home'
import AddPost from '../pages/add-posts/addPost'
import AllPosts from '../pages/all-posts/AllPosts'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/auth/register',
        element: <Register></Register>
      },
      {
        path: '/auth/login',
        element: <Login></Login>
      },
      {
        path: "/addPost",
        element: <AddPost></AddPost>
      },
      {
        path: '/posts',
        element: <AllPosts></AllPosts>
      }
    ]
  }
])

export default router