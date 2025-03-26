import { toast } from "react-toastify";
const ContactPage = () => {
  return (
    <>
      <section className="my-14 w-full mx-auto">
        <div className="flex flex-col md:flex-row p-8 bg-gray-100">
          <div className="w-full md:w-1/2 p-4">
            <h1 className="text-3xl font-bold text-teal-800">
              We Value Feedback
            </h1>
            <p className="mt-2 text-gray-600">
              Let us know your thoughts or reach out for assistance. We're here
              to help!
            </p>

            <div className="mt-6 text-gray-700 space-y-5">
              <h3 className="text-xl font-semibold mb-2">Contact Info</h3>
              <p>📍 Mymensingh, Bangladesh</p>
              <p>📞 +880 160 953 1117</p>
              <p>📧 retrievify@gmail.com</p>
            </div>
          </div>

          <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md">
            <form className="flex flex-col space-y-4 py-5">
              <input
                type="text"
                placeholder="Name*"
                className="p-3 rounded-md border-gray-200 border-2 focus:outline-none focus:border-blue-500"
                required
              />

              <input
                type="text"
                placeholder="Phone Number*"
                className="p-3 rounded-md border-gray-200 border-2 focus:outline-none focus:border-blue-500"
                required
              />

              <input
                type="date"
                placeholder="Enter Date*"
                className="p-3 rounded-md border-gray-200 border-2 focus:outline-none focus:border-blue-500"
                required
              />

              <textarea
                placeholder="Message*"
                className="p-3 rounded-md border-gray-200 border-2 focus:outline-none focus:border-blue-500 h-24"
                required
              ></textarea>

              <button
                onClick={() => toast.success("Message Sent Successfully")}
                className="bg-cyan-600 text-white py-2 px-4 rounded-md flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                Send Message ➡
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
