export default function ProductPagination({ page, totalPage, onPageChange }) {
  return (
    <div className="flex items-center justify-center gap-2 my-6">
      <button
        className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </button>

      {/* Page numbers */}
      <span className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow">
        {page}
      </span>

      <button
        className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        disabled={page === totalPage}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
