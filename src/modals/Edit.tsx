import { useEffect, useState } from "react";
//
import { doc, getDoc } from "firebase/firestore";
// types
import { TTask } from "../types/task";
// components
import Loading from "../components/Loading";
// other
import { db } from "../firebase";
import Button from "../components/UI/Button";

const Edit = ({ taskId }: any) => {
  const [task, setTask] = useState<TTask | null>(null);
  const [loadingGetTask, setLoadingGetTask] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  useEffect(() => {
    (async () => {
      try {
        setLoadingGetTask("loading");
        const docRef = doc(db, "tasks", taskId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setLoadingGetTask("success");
          setTask(docSnap.data());
        } else {
          setLoadingGetTask("error");
        }
      } catch (error) {
        setLoadingGetTask("error");
      }
    })();
  }, [taskId]);

  return (
    <div>
      {loadingGetTask === "loading" && <Loading />}
      {loadingGetTask === "success" && task && (
        <>
          <div className="flex w-full items-center justify-between">
            <div className="relative ">
              <input
                type="text"
                id="title"
                // value={title}
                // onChange={(e) => setTitle(e.target.value)}
                className=" rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Title"
              />
            </div>
            <div className="flex justify-between items-center">
              <input
                className="rounded-lg outline-none mx-[10px] border-transparent py-2 px-2 appearance-none border border-gray-300"
                type="datetime-local"
              />

              <Button>
                <span className="mr-[5px]">Image</span>
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z"></path>
                </svg>
              </Button>

              <Button>
                <span>Save</span>
              </Button>
            </div>
          </div>
          <label
            className="text-gray-700 mt-[15px] w-full"
            htmlFor="description"
          >
            <textarea
              className="w-full appearance-none resize-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              id="description"
              //   value={description}
              //   onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              name="description"
              rows={2}
            ></textarea>
          </label>
        </>
      )}
    </div>
  );
};

export default Edit;
