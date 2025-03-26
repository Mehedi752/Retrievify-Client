import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"; // Importing icons for better interaction visuals

const FAQSection = () => {
  const faqs = [
    {
      question: "How can I post a lost item?",
      answer:
        "Log in to your account and go to the 'Lost Item Add' option, then submit the necessary information.",
    },
    {
      question: "How can I contact the owner of an item?",
      answer:
        "Go to the Lost Item Details page and use the chat option to communicate.",
    },
    {
      question: "How does the trust score work?",
      answer:
        "The trust score is determined based on user activity and feedback.",
    },
    {
      question: "How can I use the chat feature?",
      answer:
        "Log in and go to the specific lost or found item page to access the chat option.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-4/6 mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-3 text-gray-800">
        Frequently Asked Questions (FAQ)
      </h2>
      <p className="text-gray-600 text-center mb-6 text-lg">
        Easily find answers to common questions about reporting lost items,
        contacting owners, trust scores, and using the chat feature. Whether
        you're looking for a lost item or helping someone else, this guide
        ensures a hassle-free experience.
      </p>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg transition-all hover:shadow-md"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left p-5 font-semibold text-lg flex justify-between items-center focus:outline-none hover:bg-gray-100 rounded-t-lg"
              aria-expanded={openIndex === index}
            >
              <span className="text-gray-800">{faq.question}</span>
              <span className="text-xl">
                {openIndex === index ? (
                  <IoIosArrowUp />
                ) : (
                  <IoIosArrowDown />
                )}
              </span>
            </button>
            {openIndex === index && (
              <div className="p-5 text-gray-700 bg-gray-50 rounded-b-lg">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
