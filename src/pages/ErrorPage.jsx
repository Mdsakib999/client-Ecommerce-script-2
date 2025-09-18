import { Link, useRouteError } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-purple-50 px-4">
      {/* Heading */}
      <h1 className="text-6xl font-extrabold text-red-600 mb-4">
        {error.status}
      </h1>
      <p className="text-3xl font-semibold mb-4 text-gray-800">
        Oops! Page {error.statusText}
      </p>
      <p className="text-center max-w-md mb-8 text-gray-600">
        Sorry, we couldn't find the page you're looking for. Maybe try going
        back to our shop?
      </p>

      {/* Call-to-action button */}
      <Link
        to="/products"
        className="px-8 py-4 font-bold rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105"
      >
        Back to Shop 🛒
      </Link>
    </div>
  );
}
