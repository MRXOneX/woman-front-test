import { useState } from "react";
//
import { doc, setDoc, Timestamp } from "firebase/firestore";
//
import uniqid from 'uniqid';
//
import { db } from "../firebase";
import { TTask } from "../types/task";



export default function Add() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [loading, setLoading] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const onAdd = async () => {
    try {
      setLoading("loading");
      const id = uniqid('task-');
      const data: TTask = {
        id,
        title,
        description,
        expiresAt: Timestamp.now().toMillis()
        // filesUrl
      };
      await setDoc(doc(db, "tasks", id), data);
      setLoading("success");
    } catch (error) {
      setLoading("error");
    }
  };

  return (
    <div className="shadow-sm flex w-[700px] flex-col items-center p-[15px] rounded-[10px] bg-white">
      <div className="flex w-full items-center justify-between">
        <div className="relative ">
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Title"
          />
        </div>
        <div className="flex items-center">
          <button>DATE</button>

          <button
            type="button"
            className="py-[2px] px-[12px] flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 h-10 rounded-lg "
          >
            <span className="mr-[7px]">Image</span>
            <svg
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z"></path>
            </svg>
          </button>

          <button
            onClick={onAdd}
            type="button"
            className="py-[2px] px-[18px] flex items-center bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 h-10 rounded-lg "
          >
            {loading === "loading" && (
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="mr-2 animate-spin"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
              </svg>
            )}
            <span className="ml-[3px]">Add</span>
          </button>
        </div>
      </div>
      <label className="text-gray-700 mt-[15px] w-full" htmlFor="description">
        <textarea
          className="w-full appearance-none resize-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          name="description"
          rows={2}
        ></textarea>
      </label>
    </div>
  );
}
