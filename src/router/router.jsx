import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../error/ErrorPage";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Home from "../pages/home/Home";
import AddPost from "../pages/add-posts/addPost";
import AllPosts from "../pages/all-posts/AllPosts";
import PostDetails from "../pages/post-details/PostDetails";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
=======
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import ErrorPage from '../error/ErrorPage'
import Register from '../auth/Register'
import Login from '../auth/Login'
import Home from '../pages/home/Home'
import AddPost from '../pages/add-posts/addPost'
import AllPosts from '../pages/all-posts/AllPosts'
import PostDetails from '../pages/post-details/PostDetails'
import MyAddedPosts from '../pages/my-added-posts/MyAddedPosts'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path:"/contact",
        element:<Contact/>
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/addPost",
        element: <AddPost></AddPost>,
      },
      {
        path: "/posts",
        element: <AllPosts></AllPosts>,
      },
      {
        path: "/posts/:id",
        element: <PostDetails></PostDetails>,
      },
      {
         path: '/posts/:id',
        element: <PostDetails></PostDetails>
      },
      {
        path: '/myAddedPosts',
        element: <MyAddedPosts></MyAddedPosts>
      }
    ],
  },
]);

export default router;
