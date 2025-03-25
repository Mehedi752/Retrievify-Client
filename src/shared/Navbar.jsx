import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import logoImg from '../assets/logo.png';


const Navbar = () => {
    const { user, signOutUser } = useAuth();
    const links = <>
        <li><Link to={'/'}>Home</Link></li>
        {
            user &&
            <>
                <li><Link to={'/posts'}>All Posts</Link></li>
                <li><Link to={'/addPost'}>Add Post</Link></li>
                {/* <li><Link to={`/borrowedBooks/${user.email}`}>Borrowed Books</Link></li> */}
            </>
        }
        <li><Link to={'/about'}>About</Link></li>
    </>

    const handleLogOut = () => {
        signOutUser()
            .then(() => {
                console.log('User signed out')
            })
            .catch(error => {
                console.log(error)
            })
    };

    return (
        <div className="bg-[#d1f7c4] py-5">
            <div className="container mx-auto">
                <div className="navbar flex items-center">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                {links}
                            </ul>
                        </div>

                        <div className="flex items-center gap-2">
                            <img src={logoImg} alt="" className="w-10 h-10 mt-2" />
                            <h3 className="text-2xl">Retrievify</h3>
                        </div>

                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {links}
                        </ul>
                    </div>
                    <div className="navbar-end gap-5">
                        {
                            user && user.photoURL ? (
                                <div className="relative group">
                                    <img
                                        src={user.photoURL}
                                        alt=""
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <p
                                        className="absolute top-8 w-[120px] text-center mt-1 left-1/2 transform -translate-x-1/2 bg-[#1a237e] text-white text-xs font-semibold rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {user.displayName}
                                    </p>
                                </div>

                            ) : (
                                <Link to={'/auth/register'} className="underline text-black hover:text-blue-700">Register</Link>
                            )
                        }
                        {
                            user && user.email ? (
                                <button onClick={handleLogOut} className="btn border-none bg-[#1a237e] hover:bg-blue-700 text-white">Logout</button>
                            ) : (
                                <Link to={'/auth/login'} className="btn bg-[#1a237e] border-none hover:bg-blue-700 text-white">Login</Link>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;