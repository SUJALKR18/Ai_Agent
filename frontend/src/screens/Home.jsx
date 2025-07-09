import React, { useState } from "react";
import { UserContext } from "../context/user_context";
import { useContext } from "react";
import axios from "../config/axios";

const Home = () => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");

  function createProject(e) {
    e.preventDefault();
    axios
      .post("/project/create", { name : projectName })
      .then((res) => {
        console.log(res.data);
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.error("Error creating project:", err);
        alert("Error creating project");
      });
  }

  return (
    <main className="min-h-screen bg-zinc-800 p-6">
      <div className="projects">
        <button
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer project text-white p-4 border border-slate-300 bg-zinc-500 rounded-md"
        >New Project 
        <i className = "ri-link ml-2"></i>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
            <h2 className="text-xl mb-4">Create New Project</h2>
            <form onSubmit={createProject}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Project Name
                </label>
                <input
                  onChange={(e) => setProjectName(e.target.value)}
                  value={projectName}
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 px-4 py-2 rounded bg-gray-300"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
