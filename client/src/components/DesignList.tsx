import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  deleteDesign,
  setCurrentDesign,
  type Design,
} from "../store/designsSlice";
import ConfirmModal from "./ConfirmModal";

const DesignList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.designs);
  const [expandedCode, setExpandedCode] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [designToDelete, setDesignToDelete] = useState<string | null>(null);

  const handleEdit = (design: Design) => {
    dispatch(setCurrentDesign(design));
  };

  const handleDelete = (id: string) => {
    setDesignToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (designToDelete) {
      dispatch(deleteDesign(designToDelete));
      setDesignToDelete(null);
    }
  };

  const toggleCode = (id: string) => {
    setExpandedCode((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filter designs based on search query
  const filteredItems = items.filter((design) =>
    design.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-900/80 rounded-xl h-full flex flex-col overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-700 bg-gray-800/50">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
          <span>📚</span>
          Saved Designs
          <span className="ml-auto text-sm font-normal text-gray-400">
            {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "design" : "designs"}
          </span>
        </h2>
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Search designs..."
            className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      </div>
      <ul className="divide-y divide-gray-700 overflow-y-auto grow custom-scrollbar">
        {filteredItems.map((design, index) => (
          <li
            key={design._id}
            className="p-6 hover:bg-gray-800/50 transition-all group"
            style={{ animation: `fadeIn 0.3s ease-in ${index * 0.05}s both` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-indigo-300 group-hover:text-indigo-200 transition-colors flex items-center gap-2">
                  <span className="text-sm">🎨</span>
                  {design.title}
                </h3>
                {design.tailwindClasses && (
                  <p className="mt-1 text-xs text-gray-500 font-mono truncate max-w-xs bg-gray-800/50 px-2 py-1 rounded">
                    {design.tailwindClasses}
                  </p>
                )}
              </div>
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                <button
                  onClick={() => handleEdit(design)}
                  className="text-indigo-400 hover:text-indigo-300 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-indigo-900/30 transition-all transform hover:scale-105"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(design._id)}
                  className="text-red-400 hover:text-red-300 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-red-900/30 transition-all transform hover:scale-105"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>

            {/* HTML Preview */}
            <div className="mb-3">
              <div className="text-xs text-gray-400 mb-2 font-semibold">
                👁️ Preview
              </div>
              <div className="p-4 bg-gray-950/50 rounded-lg border border-gray-700 flex justify-center items-center min-h-[120px] hover:border-indigo-500/50 transition-colors group-hover:shadow-lg">
                <div
                  className="w-full"
                  dangerouslySetInnerHTML={{
                    __html:
                      design.content ||
                      '<div class="text-gray-500 text-center">No preview available</div>',
                  }}
                />
              </div>
            </div>

            {/* Code Viewer */}
            <div>
              <button
                onClick={() => toggleCode(design._id)}
                className="text-xs text-gray-400 hover:text-indigo-300 font-medium mb-2 flex items-center gap-1 transition-colors"
              >
                <span>{expandedCode[design._id] ? "▼" : "▶"}</span>
                {expandedCode[design._id] ? "Hide Code" : "Show Code"}
              </button>
              {expandedCode[design._id] && (
                <div className="p-3 bg-gray-950 rounded-lg border border-gray-700 overflow-x-auto">
                  <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap wrap-break-word">
                    {design.content || "No code available"}
                  </pre>
                </div>
              )}
            </div>
          </li>
        ))}
        {filteredItems.length === 0 && (
          <li className="p-12 text-center text-gray-500 flex flex-col items-center">
            <div
              className="text-6xl mb-4"
              style={{ animation: "bounce 2s infinite" }}
            >
              {searchQuery ? "🔍" : "🎨"}
            </div>
            <p className="text-lg font-medium text-gray-400">
              {searchQuery ? "No designs found" : "No designs saved yet."}
            </p>
            <p className="text-sm mt-2 text-gray-500">
              {searchQuery
                ? `No designs matching "${searchQuery}"`
                : "Create your first masterpiece!"}
            </p>
          </li>
        )}
      </ul>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Design"
        message="Are you sure you want to delete this design? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default DesignList;
