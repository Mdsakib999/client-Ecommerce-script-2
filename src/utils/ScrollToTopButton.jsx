import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="cursor-pointer fixed bottom-5 right-5 z-50 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        <ArrowUp className="w-7 h-7 md:w-10 md:h-10 p-2 mx-auto" />
      </button>
    )
  );
}
