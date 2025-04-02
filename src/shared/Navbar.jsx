import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import logoImg from "../assets/logo.png";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: currentUser } = useQuery({
    queryKey: ['currentUser', user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user?.email}`);
      return res.data;
    },
  });
  console.log('Current User : ', currentUser);
  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            `${isActive ? "border-b-2 text-blue-500 border-blue-600" : ""
            } text-gray-600 font-medium px-2 py-2 rounded-md duration-1000`
          }
          to={"/"}
        >
          Home
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              className={({ isActive }) =>
                `${isActive ? "border-b-2 text-blue-500 border-blue-600" : ""
                } text-gray-600 font-medium px-2 py-2 rounded-md duration-1000`
              }
              to={"/posts"}
            >
              All Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `${isActive ? "border-b-2 text-blue-500 border-blue-600" : ""
                } text-gray-600 font-medium px-2 py-2 rounded-md duration-1000`
              }
              to={"/addPost"}
            >
              Add Post
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `${isActive ? "border-b-2 text-blue-500 border-blue-600" : ""
                } text-gray-600 font-medium px-2 py-2 rounded-md duration-1000`
              }
              to={"/myAddedPosts"}
            >
              My Added Post
            </NavLink>
          </li>

          {currentUser?.role === "admin" && (
            <li>
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? " border-b-2 text-blue-500 border-blue-600 " : ""
                  } text-gray-600 font-medium px-2 py-2 rounded-md duration-1000`
                }
                to={"/all-claims"}
              >
                All Claims (Admin)
              </NavLink>
            </li>
          )}

          <li>
            <NavLink
              className={({ isActive }) =>
                `${isActive ? " border-b-2 text-blue-500 border-blue-600 " : ""
                } text-gray-600 font-medium px-2 py-2 rounded-md duration-1000`
              }
              to={"/my-claims"}
            >
              My Claims
            </NavLink>
          </li>

          {currentUser?.role === "user" && (
            <li>
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? " border-b-2 text-blue-500 border-blue-600 " : ""
                  } text-gray-600 font-medium px-2 py-2 rounded-md duration-1000`
                }
                to={"/my-profile"}
              >
                My Profile
              </NavLink>
            </li>
          )}

        </>
      )}
  
      <li>
        <NavLink
          className={({ isActive }) =>
            `${isActive ? "border-b-2 text-blue-500 border-blue-600" : ""
            } text-gray-600 font-medium px-2 py-2 rounded-md duration-1000`
          }
          to={"/contact"}
        >
          Contact
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `${isActive ? "border-b-2 text-blue-500 border-blue-600" : ""
            } text-gray-600 font-medium px-2 py-2 rounded-md duration-1000`
          }
          to={"/about"}
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `${isActive ? "border-b-2 text-blue-500 border-blue-600" : ""
            } text-gray-600 font-medium px-2 py-2 rounded-md duration-1000`
          }
          to={"/feedbacks"}
        >
          Feedbacks
        </NavLink>
      </li>
    </>
  );
  const handleLogOut = () => {
    signOutUser()
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className=" bg-cyan-100 py-5">
      <div className="md:w-11/12 mx-auto">
        <div className="navbar flex items-center">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {links}
              </ul>
            </div>

            <div className="flex items-center gap-5">
              <img src={logoImg} alt="" className="w-10 h-10 mt-2" />
              <h3 className="text-2xl">Retrievify</h3>
            </div>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{links}</ul>
          </div>
          <div className="navbar-end gap-5">
            {user && user.photoURL ? (
              <div className="relative group">
                <title>{user.email}</title>
                <img
                  src={user.photoURL}
                  alt=""
                  className="w-8 h-8 rounded-full"
                />

                <p className="absolute top-8 w-[120px] text-center mt-1 left-1/2 transform -translate-x-1/2 bg-[#1a237e] text-white text-xs font-semibold rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {user.displayName}
                </p>
              </div>
            ) : (
              ""
            )}
            {user && user.email ? (
              <button
                onClick={handleLogOut}
                className="btn border-none bg-[#1a237e] hover:bg-blue-700 text-white"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to={"/auth/login"}
                className="btn bg-[#1a237e] border-none hover:bg-blue-700 text-white"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
