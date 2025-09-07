import { useEffect, useState } from "react";

export default function Test() {
  const targetDate = new Date("September 25, 2025 00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({});

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
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <script src="https://cdn.tailwindcss.com"></script>
      <h1 className="text-3xl font-bold mb-8">Countdown Timer</h1>
      <div className="flex space-x-4 text-center">
        <div>
          <div className="text-2xl font-semibold w-12 h-12 rounded-full bg-gray-700 text-white">{timeLeft.days}</div>
          <div className="text-sm text-gray-600 ">Days</div>
        </div>
        <div>
          <div className="text-2xl font-semibold">{timeLeft.hours}</div>
          <div className="text-sm text-gray-600">Hours</div>
        </div>
        <div>
          <div className="text-2xl font-semibold">{timeLeft.minutes}</div>
          <div className="text-sm text-gray-600">Mins</div>
        </div>
        <div>
          <div className="text-2xl font-semibold">{timeLeft.seconds}</div>
          <div className="text-sm text-gray-600">Secs</div>
        </div>
      </div>
    </div>
  );
}
