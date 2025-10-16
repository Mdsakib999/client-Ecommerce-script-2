import { useEffect, useState } from "react";

export default function OfferTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex space-x-4 text-center">
      {["days", "hours", "minutes", "seconds"].map((key) => (
        <div key={key}>
          <div className="text-xl md:text-2xl font-semibold w-12 h-12 rounded-full bg-gray-700 text-white flex items-center justify-center">
            {timeLeft[key]}
          </div>
          <div className="text-xs md:text-sm text-gray-600 capitalize">
            {key}
          </div>
        </div>
      ))}
    </div>
  );
}
