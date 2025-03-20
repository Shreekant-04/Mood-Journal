import React, { useCallback, useEffect, useState } from "react";
import Grid from "./Grid";
import List from "./List";
import Loader from "../../utils/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import { FaSync } from "react-icons/fa";
import { Link } from "react-router";
import EntryForm from "./EntryForm";

const Home = () => {
  const [mood, setMood] = useState("all");
  const [view, setView] = useState(localStorage.getItem("view") || "grid");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [metrics, setMetrics] = useState({ totalEntries: 0, lastEntry: "" });
  const [isnewEntry, setNewEntry] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/entries`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response || !response.data) {
        throw new Error("Invalid response from server.");
      }
      const { data } = response.data;
      setMetrics({
        totalEntries: response.data.totalEntries,
        lastEntry: response.data.lastEntry,
      });
      setData(data);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Something went wrong");
      } else if (error.request) {
        toast.error("No response from server. Please try again.");
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };
  const filter = ["All", "Happy", "Sad", "Neutral"];
  const handleView = (e) => {
    const view = e.target.textContent.toLowerCase();
    setView(view);
    localStorage.setItem("view", view);
  };

  const handleFilter = useCallback(
    (mood) => {
      setLoading(true);
      if (mood === "all") {
        setFilteredData(data);
      } else {
        const filtered = data.filter((item) => item.mood === mood);
        setFilteredData(filtered);
      }
      setLoading(false);
    },
    [data]
  );
  useEffect(() => {
    fetchData();
  }, [isnewEntry]);

  useEffect(() => {
    handleFilter(mood);
  }, [handleFilter, mood]);

  return (
    <>
      {isnewEntry && <EntryForm setNewEntry={setNewEntry} />}
      {!isnewEntry && (
        <>
          <article className="container mx-auto p-6 bg-[--light-gray] rounded-xl shadow-lg">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-[--dark-gray] mb-4">
                Journal Entries
              </h1>
              <button
                onClick={fetchData}
                className="flex items-center gap-2 p-2 rounded-lg text-[--primary] hover:bg-[--secondary] hover:text-white transition"
              >
                <FaSync className="text-lg" />
              </button>
            </div>

            <section className="flex justify-between items-center bg-[--white-smoke] p-4 rounded-lg shadow-sm">
              <div className="flex flex-col items-center">
                <p className="text-sm text-gray-500">Total Entries</p>
                <p className="text-lg font-semibold text-[--dark-gray]">
                  {metrics.totalEntries}
                </p>
              </div>

              <div className="flex flex-col items-center">
                <p className="text-sm text-gray-500">Last Entry</p>
                <p className="text-lg font-semibold text-[--dark-gray]">
                  {metrics?.lastEntry
                    ? new Date(metrics?.lastEntry).toLocaleDateString()
                    : "NA"}
                </p>
              </div>

              <button
                onClick={() => setNewEntry(true)}
                className="flex flex-col items-center px-4 py-2 bg-[--primary] text-white rounded-lg hover:bg-opacity-90 transition duration-200"
              >
                <span className="text-2xl font-bold">+</span>
                <p className="text-sm">Add Entry</p>
              </button>
            </section>
          </article>

          <section className="w-full container mx-auto flex flex-col sm:flex-row justify-between items-center p-4 bg-[--white-smoke] rounded-lg shadow">
            <div className="flex flex-col items-start p-3">
              <label
                htmlFor="moodSelect"
                className="text-[--dark-gray] font-semibold mb-1 text-center"
              >
                Select Mood:
              </label>
              <select
                id="moodSelect"
                onChange={(e) => setMood(e.target.value.toLowerCase())}
                value={mood || ""}
                className="w-40 p-2 border rounded bg-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[--primary]"
              >
                {Array.isArray(filter) && filter.length > 0 ? (
                  filter.map((item, index) => (
                    <option key={index} value={item.toLowerCase()}>
                      {item}
                    </option>
                  ))
                ) : (
                  <option disabled>No moods available</option>
                )}
              </select>
            </div>

            <div className="flex gap-4 mt-4 sm:mt-0">
              <button
                className={`px-4 py-2 rounded font-medium transition ${
                  view === "grid"
                    ? "bg-[--primary] text-white"
                    : "bg-gray-200 hover:bg-[--secondary] hover:text-white"
                }`}
                onClick={handleView}
              >
                Grid
              </button>
              <button
                className={`px-4 py-2 rounded font-medium transition ${
                  view === "list"
                    ? "bg-[--primary] text-white"
                    : "bg-gray-200 hover:bg-[--secondary] hover:text-white"
                }`}
                onClick={handleView}
              >
                List
              </button>
            </div>
          </section>

          {loading ? (
            <Loader />
          ) : (
            <section className="container mx-auto">
              {view === "grid" ? (
                <Grid data={filteredData} />
              ) : (
                <List data={filteredData} />
              )}
            </section>
          )}
        </>
      )}
    </>
  );
};

export default Home;
