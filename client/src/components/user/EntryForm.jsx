import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const EntryForm = ({ setNewEntry }) => {
  const [formData, setFormData] = useState({
    title: "",
    mood: "",
    content: "",
  });
  const [btnText, setBtnText] = useState("save");
  const [showQuote, setShowQuote] = useState(false);
  const [quote, setQuote] = useState({});

  const isDisable = btnText === "Saving...";
  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    let journals = JSON.parse(localStorage.getItem("journals")) || [];
    const data = { ...formData, index: journals.length || 0 };
    journals.push(data);
    localStorage.setItem("journals", JSON.stringify(journals));
    toast.success("saved as draft");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnText("Saving...");
    const structured = JSON.stringify(formData.content);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/entries`,
        { ...formData, content: structured },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        toast.success(response.data.message || "Entry saved successfully!");
        setQuote(response.data.quote);
        setFormData({ title: "", mood: "", content: "" });
        setShowQuote(true);
      } else {
        toast("Unexpected response status");
      }
    } catch (error) {
      console.error("Error saving entry:", error);
      toast.error("Failed to save entry. Please try again.");
    } finally {
      setBtnText("Save");
    }
  };
  const handleClose = () => {
    setShowQuote(false);
    setNewEntry(false);
  };

  return (
    <>
      {showQuote && <Quotes data={quote} handleClose={handleClose} />}
      <div className="flex justify-end max-w-2xl mx-auto fixed top-24 right-10">
        <button
          onClick={() => setNewEntry(false)}
          className="bg-[--danger] text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
        >
          ✖ Close
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto p-6 bg-[--white] shadow-lg rounded-lg mt-4"
      >
        <div className="mb-4">
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="text-2xl font-bold text-[--dark-gray] w-full border border-[--border-color] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[--primary]"
            placeholder="Enter Title"
            required
          />
        </div>

        <div className="mb-4">
          <select
            value={formData.mood}
            onChange={(e) => handleChange("mood", e.target.value)}
            className="text-md text-[--primary] font-semibold w-full border border-[--border-color] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[--primary] bg-white cursor-pointer"
            required
          >
            <option value="" disabled>
              Select Mood
            </option>
            <option value="happy">Happy 😊</option>
            <option value="sad">Sad 😢</option>
            <option value="neutral">Neutral 😐</option>
          </select>
        </div>

        <div className="mb-4">
          <textarea
            value={formData.content}
            onChange={(e) => handleChange("content", e.target.value)}
            className="text-[--dark-gray] w-full h-40 border border-[--border-color] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[--primary]"
            placeholder="Write your entry here..."
            required
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-[--danger] hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Save as Draft
          </button>
          <button
            type="submit"
            className="bg-[--primary] hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
            disabled={isDisable}
          >
            {btnText}
          </button>
        </div>
      </form>
    </>
  );
};
export default EntryForm;

const Quotes = ({ data, handleClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
      <div className="max-w-lg w-full bg-white rounded-lg p-6 shadow-lg flex flex-col items-center gap-4 transition-opacity">
        <p className="text-gray-700 text-lg font-semibold italic text-center">
          "{data?.quote}"
        </p>
        <p className="text-gray-500 text-md font-medium">- {data?.author}</p>
        <button
          onClick={() => handleClose(false)}
          className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};
