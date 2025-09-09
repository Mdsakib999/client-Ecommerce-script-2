import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useForm } from "react-hook-form";

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    alert("✅ Message sent successfully!");
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl p-8 grid md:grid-cols-2 gap-12">
        {/* Left: Contact Info */}
        <div>
          <h2 className="text-3xl font-semibold mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Have questions? We’d love to hear from you. Our support team is here
            to help you anytime.
          </p>

          <div className="space-y-6 text-gray-700">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-blue-600" />
              <span>123 Street, Dhaka, Bangladesh</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-6 h-6 text-blue-600" />
              <span>+880 123 456 789</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-blue-600" />
              <span>support@yourstore.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-blue-600" />
              <span>Sat - Thu: 10AM - 8PM</span>
            </div>
          </div>

          {/* Map */}
          <div className="mt-8">
            <iframe
              title="map"
              className="w-full h-52 rounded-xl shadow-md"
              src="https://www.google.com/maps/embed"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-md">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">
            Send us a Message
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                {...register("subject", { required: "Subject is required" })}
                placeholder="Enter subject"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                {...register("message", { required: "Message is required" })}
                placeholder="Write your message..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition h-32 resize-none"
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
