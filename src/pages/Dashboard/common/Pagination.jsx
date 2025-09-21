export default function Pagination({
  page,
  available,
  total,
  totalPage,
  onPageChange,
}) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-6 border-gray-200">
      {/* Result Info */}
      <p className="text-sm text-gray-500">
        <span className="text-gray-800 font-semibold">{available}</span> of{" "}
        <span className="text-gray-800 font-semibold">{total}</span> results
        displayed
      </p>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>

        {/* Current Page Indicator */}
        <span className="px-4 py-2 text-sm text-center font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-md">
          Page {page} of {totalPage}
        </span>

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPage}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
