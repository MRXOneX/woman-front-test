import { useEffect, useState } from "react";
//
import { collection, onSnapshot } from "firebase/firestore";
//
import { db } from "./firebase";
// components
import Task from "./components/Task";
import Delete from "./components/UI/Icons/Delete";
import Edit from "./components/UI/Icons/Edit";
import Add from "./components/Add";
// types
import { TTask } from "./types/task";
import Loading from "./components/Loading";

function App() {
  const [tasks, setTasks] = useState<TTask[] | null>(null);
  const [loading, setLoading] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  useEffect(() => {
    (async () => {
      try {
        setLoading("loading");

        // const tasksCol = collection(db, "tasks");
        // const tasksSnapshot = await getDocs(tasksCol);
        // const taskList: TTask[] = tasksSnapshot.docs.map((doc) => doc.data());

        const unsubscribe = onSnapshot(
          collection(db, "tasks"),
          (snapshot) => {
            setTasks(snapshot.docs.map((doc) => doc.data()));
          },
          (error) => {
            // ...
          }
        );
        setLoading("success");

        return () => {
          unsubscribe();
        };
      } catch (error) {
        setLoading("error");
      }
    })();
  }, []);

  return (
    <div className="flex items-center flex-col justify-center h-full">
      <span className="text-indigo-600 mb-[25px] text-[44px] font-bold">
        ToDo List
      </span>
      <Add  />

      <div className="flex mt-[10px] flex-col overflow-y-auto max-h-[600px]">
        {loading === "success" &&
          tasks &&
          tasks.map((task: TTask) => <Task key={task.id} {...task} />)}
        {loading === "loading" && <Loading />}
      </div>
      <div className="h-[10px]" />
    </div>
  );
}

export default App;
