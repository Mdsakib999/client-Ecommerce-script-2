import toast from "react-hot-toast";

export default function confirmToast({ message, onConfirm, onCancel }) {
  toast.custom(
    (t) => (
      <div
        className={`
          bg-white border border-gray-200 shadow-2xl rounded-xl p-6 
          flex flex-col items-center space-y-4 w-96 max-w-sm mx-auto
          backdrop-blur-sm transition-all duration-200 ease-in-out
          ${
            t.visible
              ? "animate-enter scale-100 opacity-100"
              : "animate-leave scale-95 opacity-0"
          }
        `}
        style={{
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Warning Icon */}
        <div className="flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full">
          <svg
            className="w-6 h-6 text-amber-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
          Confirm Action
        </h3>

        {/* Message */}
        <p className="text-sm text-gray-600 text-center leading-relaxed max-w-xs">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-2 w-full">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              if (onCancel) onCancel();
            }}
            className="
              flex-1 px-4 py-2.5 rounded-lg border border-gray-300 
              text-gray-700 font-medium text-sm
              hover:bg-gray-50 hover:border-gray-400
              active:bg-gray-100 active:scale-95
              transition-all duration-150 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2
            "
          >
            Cancel
          </button>

          <button
            onClick={() => {
              toast.dismiss(t.id);
              if (onConfirm) onConfirm();
            }}
            className="
              flex-1 px-4 py-2.5 rounded-lg 
              bg-red-600 text-white font-medium text-sm
              hover:bg-red-700 active:bg-red-800 active:scale-95
              transition-all duration-150 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
              shadow-sm
            "
          >
            Confirm
          </button>
        </div>
      </div>
    ),
    {
      position: "top-center",
      duration: Infinity,
      id: "confirmation-toast",
    }
  );
}
