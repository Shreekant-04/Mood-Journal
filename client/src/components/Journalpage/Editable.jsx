import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Editable = ({ data, setIsEditable }) => {
  const [title, setTitle] = useState(data.title);
  const [mood, setMood] = useState(data.mood);
  const [content, setContent] = useState(data.content);

  const handleSave = async () => {
    const confirmSave = window.confirm("Confirm to Save?");
    if (!confirmSave) return;

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/user/entry/${data?._id}`,
        { title, mood, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message || "Updated successfully.");
        setIsEditable(false);
      } else {
        toast.error("Failed to update entry.");
      }
    } catch (error) {
      console.error("Error updating entry:", error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-3xl font-bold text-gray-800 mb-2 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <input
        type="text"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className="text-md text-blue-500 font-semibold w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <p className="text-sm text-gray-500">{data.date}</p>
      <hr className="my-4" />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="text-gray-700 w-full h-40 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex justify-end mt-4 gap-2">
        <button
          onClick={() => setIsEditable(false)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Editable;
