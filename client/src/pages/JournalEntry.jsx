import axios from "axios";
import { FiMoreVertical } from "react-icons/fi";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Loader from "../utils/Loader";
import NotFound from "./NotFound";
import { toast } from "react-toastify";
import NonEditable from "../components/Journalpage/NonEditable";
import Editable from "../components/Journalpage/Editable";

const JournalEntry = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const { id } = useParams();
  const nav = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchText.trim() || !data?.content) return;

    setData((prevData) => ({
      ...prevData,
      content: highlightText(prevData.content),
    }));
  };

  const highlightText = (text) => {
    if (!searchText.trim()) return text;
    return text.replace(
      new RegExp(`(${searchText})`, "gi"),
      `<span class="bg-orange-400 font-bold">$1</span>`
    );
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/user/entry/${data?._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 204) {
        toast.success("Entry deleted successfully.");
        nav("/user");
      }
    } catch (error) {
      console.error("Error deleting entry", error);
    }
  };

  useEffect(() => {
    const fetchEntry = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/entry/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const { data } = await response.data;
        setData(data);
      } catch (error) {
        console.error("Error fetching entry", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntry();
  }, [id, isEditable]);

  return (
    <>
      {loading && <Loader />}

      {data ? (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-[--white] shadow-md rounded-lg">
            <form
              className="flex items-center w-full sm:w-auto"
              onSubmit={handleSearch}
            >
              <input
                type="text"
                placeholder="Search Text"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                className="border border-[--border-color] rounded-lg p-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-[--primary]"
              />
              <button
                type="submit"
                className="bg-[--primary] hover:bg-[--primary-hover] text-white rounded-lg p-2 ml-2 transition duration-300"
              >
                Search
              </button>
            </form>

            <div
              className="relative inline-block text-left"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <button className="bg-[--secondary] hover:bg-gray-300 text-[--dark-gray] rounded-lg px-4 py-2 flex items-center gap-1 transition duration-300">
                More <FiMoreVertical />
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-[--white] border border-[--border-color] rounded-lg shadow-lg z-50">
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => {
                      setIsEditable(true);
                      setIsOpen(false);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-[--danger] hover:bg-gray-100 transition"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          {isEditable ? (
            <Editable data={data} setIsEditable={setIsEditable} />
          ) : (
            <NonEditable data={data} highlightText={highlightText} />
          )}
        </>
      ) : (
        <NotFound text="Entry not found." />
      )}
    </>
  );
};

export default JournalEntry;
