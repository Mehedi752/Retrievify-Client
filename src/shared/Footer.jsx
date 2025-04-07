import React from "react";
import logoImg from "../assets/logo.png";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
const Footer = () => {
  return (
    <div>
      <footer className="bg-cyan-100 py-12">
        <div className="md:w-11/12 mx-auto px-6 lg:px-0 flex flex-col lg:flex-row gap-6 lg:justify-between">
          {/* Logo and Description */}
          <div className="lg:w-1/3">
            <div className="flex items-center space-x-2 mb-4">
              <img src={logoImg} alt="Logo" className="w-10 h-10 mt-2" />
              <h2 className="text-2xl font-semibold">ReGain</h2>
            </div>
            <p className="">
              Product Hunt is a hub for all the latest products and trends. We
              are dedicated to providing quality service and the best user
              experience.
            </p>
          </div>

          {/* Contact Information */}
          <div className="lg:w-1/3">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <IoLocationOutline className="text-xl" />
                <span>Mirpur, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center space-x-2">
                <HiOutlinePhone className="text-xl" />
                <span>+880 160 953 1117</span>
              </li>
              <li className="flex items-center space-x-2">
                <HiOutlineMail className="text-xl" />
                <span>ferot@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex flex-col space-y-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className=" transition flex items-center gap-2"
              >
                <FaFacebookF className="text-2xl" />
                <h3 className="">Facebook</h3>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className=" transition flex items-center gap-2"
              >
                <FaTwitter className="text-2xl" />
                <h3 className="">Twitter</h3>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className=" transition flex items-center gap-2"
              >
                <FaInstagram className="text-2xl" />
                <h3 className="">Instagram</h3>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className=" transition flex items-center gap-2"
              >
                <FaLinkedin className="text-2xl" />
                <h3 className="">Linkedin</h3>
              </a>
            </div>
          </div>
        </div>
        <div className="container mx-auto border-t border-gray-600 mt-8 pt-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Retrievify. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
