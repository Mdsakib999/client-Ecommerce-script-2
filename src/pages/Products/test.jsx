import React, {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {Link} from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  FaUtensils,
  FaCalendarAlt,
  FaComment,
  FaMapMarkerAlt,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";

const SectionTitle = ({children}) => (
  <div className="mb-5">
    <h3 className="text-lg font-extrabold tracking-tight">{children}</h3>
    <div className="h-[3px] w-10 bg-red-600 mt-2" />
  </div>
);

const LoadMore = () => (
  <button className="mt-4 inline-block bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-wide px-4 py-2 rounded">
    Show Details
  </button>
);

const divisions = [
  "Dhaka",
  "Chattogram",
  "Khulna",
  "Rajshahi",
  "Barisal",
  "Sylhet",
  "Rangpur",
  "Mymensingh",
];

export default function AllDonations() {
  const axiosInstance = useAxiosSecure();
  const [filters, setFilters] = useState({
    location: "",
    order: "asc",
    search: "",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFilters((prev) => ({...prev, [name]: value}));
  };

  const {data: donations = [], isLoading} = useQuery({
    queryKey: ["verified-donations", filters],
    queryFn: async () => {
      const res = await axiosInstance.get(/donations/verified);
      return res.data;
    },
  });

  const sortedDonations = [...donations]
    .filter((d) => (filters.location ? d.location === filters.location : true))
    .filter((d) =>
      filters.search
        ? d.title.toLowerCase().includes(filters.search.toLowerCase())
        : true
    )
    .sort((a, b) => {
      const quantityA = Number(a.quantity);
      const quantityB = Number(b.quantity);
      return filters.order === "asc"
        ? quantityA - quantityB
        : quantityB - quantityA;
    });

// Add at the top along with useState
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 3;
const totalPages = Math.ceil(sortedDonations.length / itemsPerPage);

// Slice donations for current page
const currentDonations = sortedDonations.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <svg
          className="animate-spin h-10 w-10 text-yellow-600"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            className="opacity-25"
          />
          <path
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
            className="opacity-75"
          />
        </svg>
      </div>
    );

  return (
    <section className="py-12" style={{backgroundColor: "#f4f7fc"}}>
      <div className="max-w-[1180px] mx-auto px-4 md:px-6 lg:px-8">
          {/* Right Column: Sidebar */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
            {/* Search + Filters */}
            <div className="bg-white rounded-xl shadow-md p-5 space-y-4">
              <SectionTitle>Search & Filter</SectionTitle>
             
              {/* Location */}
              <select
                name="location"
                value={filters.location}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value=""> Filter by Division</option>
                {divisions.map((div) => (
                  <option key={div} value={div}>
                    {div}
                  </option>
                ))}
              </select>

              {/* Quantity Sort */}
              <select
                name="order"
                value={filters.order}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="asc">
                  <FaSortAmountDown className="inline" /> Quantity Low to High
                </option>
                <option value="desc">
                  <FaSortAmountUp className="inline" /> Quantity High to Low
                </option>
              </select>
            </div>

            {/* Category */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <SectionTitle>Category</SectionTitle>
              <ul className="divide-y divide-gray-200">
                {sortedDonations.map((d) => (
                  <li
                    key={d._id}
                    className="flex items-center justify-between py-2 text-sm"
                  >
                    <span className="hover:text-red-600">{d.foodType}</span>
                    <span className="text-gray-500">({d.quantity})</span>
                  </li>
                ))}
              </ul>
            </div>

            
          </aside>
        </div>
      </div>
    </section>
  )
}