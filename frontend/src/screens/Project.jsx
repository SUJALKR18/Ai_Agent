import React, { useState } from 'react'
import {useLocation} from 'react-router-dom';

const Project = () => {
    const location = useLocation();
    console.log(location.state);

    const [isSidePanelOpen, setisSidePanelOpen] = useState(false)

    return (
      <main className="h-screen w-screen flex">
        <section className="left relative flex flex-col h-full min-w-72 bg-slate-300">
          <header className="flex justify-end w-full p-2 px-4 bg-slate-100">
            <button
              onClick={() => setisSidePanelOpen(!isSidePanelOpen)}
              className="p-2"
            >
              <i className="ri-group-fill"></i>
            </button>
          </header>

          <div className="conversation-area flex-grow flex flex-col">
            <div className="message-box flex-grow flex flex-col gap-1 p-1">
              <div className=" message max-w-56 flex flex-col p-2 bg-slate-50 w-fit rounded-md">
                <small className="opacity-65 text-xs">example@gmail.com</small>
                <p className="text-sm font-bold">hello</p>
              </div>
              <div className="ml-auto message max-w-56 flex flex-col p-2 bg-slate-50 w-fit rounded-md">
                <small className="opacity-65 text-xs">example@gmail.com</small>
                <p className="text-sm font-bold">hello</p>
              </div>
            </div>
            <div className="inputField w-full flex">
              <input
                className="p-2 px-4 border-none outline-none bg-white"
                type="text"
                placeholder="Enter Message"
              />
              <button className="px-3 flex-grow">
                <i className="ri-send-plane-fill"></i>
              </button>
            </div>
          </div>

          <div
            className={`sidePanel w-full h-full flex flex-col gap-2 bg-slate-50 absolute transition-all ${
              isSidePanelOpen ? "translate-x-0" : "-translate-x-full"
            } top-0`}
          >
            <header className="flex justify-end w-full p-2 px-3 bg-slate-100">
              <button
                onClick={() => setisSidePanelOpen(!isSidePanelOpen)}
                className="p-2"
              >
                <i className="ri-close-fill"></i>
              </button>
            </header>

            <div className="users flex flex-col gap-2">
                <div className="user">
                    <img src="" alt="" />
                </div>
            </div>
          </div>
        </section>
      </main>
    );
}

export default Project