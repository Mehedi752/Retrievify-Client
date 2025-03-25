import { FaSearch, FaHandshake, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router";

const About = () => {
  return (
    <div className="bg-gray-100 py-16 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Helping You Find What Matters Most
        </h2>
        <p className="mt-4 text-gray-600">
          Our platform connects people to recover lost items and build a trusted
          community.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        <div className="bg-white p-6 shadow-lg rounded-xl text-center">
          <FaSearch className="text-blue-500 text-5xl mx-auto" />
          <h3 className="text-xl font-semibold mt-4">Search & Find</h3>
          <p className="text-gray-500 mt-2">
            Use smart filters to search for lost items quickly and easily.
          </p>
        </div>

        <div className="bg-white p-6 shadow-lg rounded-xl text-center">
          <FaHandshake className="text-green-500 text-5xl mx-auto" />
          <h3 className="text-xl font-semibold mt-4">Trust & Security</h3>
          <p className="text-gray-500 mt-2">
            We ensure verified item recovery with a secure verification system.
          </p>
        </div>

        <div className="bg-white p-6 shadow-lg rounded-xl text-center">
          <FaCheckCircle className="text-yellow-500 text-5xl mx-auto" />
          <h3 className="text-xl font-semibold mt-4">Easy Connection</h3>
          <p className="text-gray-500 mt-2">
            Chat and connect with finders or owners securely within the
            platform.
          </p>
        </div>
      </div>

      <div className="text-center mt-12">
        <Link to="/report-lost-item">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700">
            Report a Lost Item
          </button>
        </Link>
      </div>
    </div>
  );
};
export default About;
