import { useState } from "react";

export default function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Open Modal
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-lg w-96 p-6 relative">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Tailwind Modal
            </h2>
            <p className="text-gray-600 mb-6">
              This is a reusable modal component built with React + Tailwind.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-100"
              >
                Close
              </button>
              <button
                onClick={() => alert("Confirmed!")}
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
