import { Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Faq() {
  const faqs = [
    {
      question: "What types of electronic accessories do you sell?",
      answer:
        "We offer a wide range of electronic accessories including headphones, chargers, phone cases, smartwatches, Bluetooth speakers, gaming accessories, and much more. All our products are from trusted brands with warranty support.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship our products worldwide. Shipping fees and delivery time may vary depending on your location. You can calculate shipping costs at checkout.",
    },
    {
      question: "How can I track my order?",
      answer:
        "After placing an order, you will receive a tracking number via email. You can use this number on our tracking portal to see real-time updates on your shipment.",
    },
    {
      question: "What is your return and refund policy?",
      answer:
        "We offer a 30-day return policy on all electronic accessories. Products must be unused and in original packaging. Refunds are processed within 5-7 business days after we receive the returned item.",
    },
    {
      question: "Do your products come with a warranty?",
      answer:
        "Yes, most of our electronic accessories come with a 6-month to 1-year warranty depending on the brand. Warranty details are provided with each product description.",
    },
    {
      question: "What is your return and refund policy?",
      answer:
        "We offer a 30-day return policy on all electronic accessories. Products must be unused and in original packaging. Refunds are processed within 5-7 business days after we receive the returned item.",
    },
    {
      question: "Do your products come with a warranty?",
      answer:
        "Yes, most of our electronic accessories come with a 6-month to 1-year warranty depending on the brand. Warranty details are provided with each product description.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const [heights, setHeights] = useState([]);

  const contentRefs = useRef([]);

  useEffect(() => {
    setHeights(contentRefs.current.map((ref) => (ref ? ref.scrollHeight : 0)));
  }, []);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-10 my-16 max-w-7xl mx-auto">
      <h2 className="text-2xl mb-10 md:text-4xl font-semibold">
        Popular Questions...!
      </h2>
      <div className=" w-full gap-10">
        
        {/* Right side FAQ */}
        <div className=" space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg overflow-hidden shadow-sm"
            >
              <button
                className="w-full cursor-pointer flex justify-between items-center px-4 py-3 bg-gray-100 font-semibold focus:outline-none hover:bg-gray-200 transition-colors"
                onClick={() => toggleFaq(index)}
              >
                {faq.question}
                {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
              </button>
              <div
                ref={(el) => (contentRefs.current[index] = el)}
                className="px-4 overflow-hidden transition-all duration-500 ease-in-out text-gray-700 text-sm"
                style={{
                  maxHeight:
                    openIndex === index ? `${heights[index]}px` : "0px",
                }}
              >
                <div className="py-3">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
