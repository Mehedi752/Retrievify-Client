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
import MyAddedPosts from "../pages/my-added-posts/MyAddedPosts";
import ClaimItem from "../pages/ClaimItem/claimItem";
import ClaimDetails from "../pages/ClaimDetails/ClaimDetails";
import MyClaims from "../pages/MyClaims/MyClaims";
import AllClaims from "../pages/AllClaims/AllClaims";
import UpdatePost from "../pages/update-post/UpdatePost";
import Donation from "../pages/donation/Donation";
import SuccessPaymentModal from "../pages/donation/SuccessPayment";
import Feedbacks from "../pages/feedbacks/Feedbacks";
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
        path: '/myAddedPosts',
        element: <MyAddedPosts></MyAddedPosts>
      },
      {
        path: '/claim-item',
        element: <ClaimItem></ClaimItem>
      },
      {
        path: '/all-claims',
        element: <AllClaims />
      },
      {
        path: '/my-claims',
        element: <MyClaims />
      },
      {
        path: '/claim-details/:id',
        element: <ClaimDetails />
      },
      {
        path: '/posts/update/:id',
        element: <UpdatePost></UpdatePost>
      },
      {
        path: '/donation',
        element: <Donation></Donation>
      },
      {
        path: '/success',
        element: <SuccessPaymentModal></SuccessPaymentModal>
      },
      {
        path: '/feedbacks',
        element: <Feedbacks></Feedbacks>
      }
    ],
  },
]);

export default router;
