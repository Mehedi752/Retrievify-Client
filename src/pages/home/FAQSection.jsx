import { useState } from "react";

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
      <h2 className="text-2xl font-bold text-center mb-3">
        Frequently Asked Questions (FAQ)
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Easily find answers to common questions about reporting lost items,
        contacting owners, trust scores, and using the chat feature. Whether
        you're looking for a lost item or helping someone else, this guide
        ensures a hassle-free experience.
      </p>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg transition-all"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left p-4 font-semibold text-lg flex justify-between items-center focus:outline-none"
              aria-expanded={openIndex === index}
            >
              {faq.question}
              <span
                className={`transform transition-transform ${
                  openIndex === index ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
            </button>
            {openIndex === index && (
              <div className="p-4 text-gray-700 border-t bg-gray-50">
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
