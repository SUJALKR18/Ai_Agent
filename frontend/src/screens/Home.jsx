import React, { useState} from "react";
import { UserContext } from "../context/user_context";
import { useContext } from "react";
import axios from "../config/axios";
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom';

const Home = () => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [project, setproject] = useState([]);
  const navigate = useNavigate();
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

  useEffect(() => {
    axios.get("/project/all").then((res) => {
      setproject(res.data.projects);
    })
    .catch((err) => {
      console.error(err);
    })
  },[]);

  return (
    <main className="min-h-screen bg-zinc-800 p-6">
      <div className="projects flex flex-wrap gap-3">
        <button
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer project text-white p-4 border border-slate-300 bg-zinc-500 rounded-md"
        >
          New Project
          <i className="ri-link ml-2"></i>
        </button>

        <div className="grid grid-cols-3 gap-4">
          {project.map((proj) => (
            <div
              key={proj._id}
              onClick={() => navigate(`/project` , {
                state : {proj}
              })}
              className="project cursor-pointer flex flex-col gap-2 text-white p-4 border border-slate-300 bg-zinc-500 rounded-md min-w-52 hover:bg-zinc-700"
            >
              <h2 className="text-lg font-semibold mb-2">{proj.name}</h2>
              <div className="flex gap-2">
                <p>
                  <i className="ri-user-3-line"></i> Collaborators :
                </p>
                {proj.users.length}
              </div>
            </div>
          ))}
        </div>
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
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
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
