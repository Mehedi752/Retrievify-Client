import axios from 'axios';
import { FaSearch, FaHandshake, FaCheckCircle, FaDonate, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';

const About = () => {
  const { user } = useAuth();
  const [donation, setDonation] = useState("");

  const handleDonate = async () => {
    if (!donation || isNaN(donation) || donation <= 0) {
      Swal.fire("Error", "Please enter a valid donation amount!", "error");
      return;
    }

    const payment = {
      name: user?.displayName || "Anonymous",
      email: user?.email,
      amount: donation,
      transactionId: "",
      date: new Date().toLocaleDateString(),
      status: "pending",
    }

    const response = await axios.post("http://localhost:5000/create-payment-method", payment)
    console.log(response);

    if (response.data?.gatewayURL) {
      window.location.replace(response.data.gatewayURL);
    }

  };
  return (
    <div className="bg-gray-100 py-12 px-6 lg:px-0">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Helping You Find What Matters Most
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform connects people to recover lost items and build a trusted community.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {[
            {
              icon: <FaSearch className="text-blue-500 text-6xl mx-auto" />,
              title: 'Search & Find',
              description: 'Use smart filters to search for lost items quickly and easily.',
            },
            {
              icon: <FaHandshake className="text-green-500 text-6xl mx-auto" />,
              title: 'Trust & Security',
              description: 'We ensure verified item recovery with a secure verification system.',
            },
            {
              icon: <FaCheckCircle className="text-yellow-500 text-6xl mx-auto" />,
              title: 'Easy Connection',
              description: 'Chat and connect with finders or owners securely within the platform.',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 shadow-lg rounded-xl text-center transition-transform duration-300 hover:scale-105"
            >
              {item.icon}
              <h3 className="text-2xl font-semibold mt-5 text-gray-800">{item.title}</h3>
              <p className="text-gray-500 mt-3">{item.description}</p>
            </div>
          ))}
        </div>

        {/* <div className="text-center mt-16">
          <Link to="/report-lost-item">
            <button className="bg-[#1a237e] hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300shadow-md hover:shadow-lg">
              Report a Lost Item
            </button>
          </Link>
        </div> */}


        <div className="mt-16 px-6 lg:px-[375px]">
          <div className="p-6 bg-white shadow-lg rounded-xl mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3 text-center">Make a Donation</h2>
            <p className="text-gray-600 mb-4 text-center">
              Your donation helps us reward those who return lost items. Every contribution counts! ❤️
            </p>

            <input
              type="number"
              className="input input-bordered w-full text-lg p-3 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Enter donation amount (BDT)"
              value={donation}
              onChange={(e) => setDonation(e.target.value)}
            />

            <button
              className="btn bg-green-600 hover:bg-green-700 text-white w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-lg transition duration-300"
              onClick={handleDonate}
            >
              <FaDonate /> Donate Now
            </button>
          </div>

          {/* Appreciation Quote */}
          <div className="p-6 bg-white rounded-lg text-lg font-medium italic text-center shadow-md">
            <FaHeart className="text-red-500 text-4xl mx-auto mb-3 animate-pulse" />
            "The real gift of kindness is that it makes both the giver and the receiver feel richer.
            Thank you for making the world a better place🙏✨"
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
