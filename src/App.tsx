import { useEffect, useState } from "react";
//
import { collection, onSnapshot } from "firebase/firestore";
//
import { db } from "./firebase";
// components
import Task from "./components/Task";
import Add from "./components/Add";
// types
import { TTask } from "./types/task";
import Loading from "./components/Loading";
import Modal from "./layouts/Modal";
import Edit from "./components/Edit";
import Editor from "./components/Editor";

function App() {
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<string | null>(null);

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

        const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
          setTasks(snapshot.docs.map((doc) => doc.data()));
        });
        setLoading("success");

        return () => {
          unsubscribe();
        };
      } catch (error) {
        setLoading("error");
      }
    })();
  }, []);

  const onHandleEditTask = (id: string) => {
    setTaskId(id);
    setIsOpenEdit(true);
  };

  return (
    <div className="flex relative items-center flex-col justify-center h-full">
      <Modal
        isOpen={isOpenEdit}
        content={<Edit taskId={taskId} />}
        onClose={() => setIsOpenEdit(false)}
      />
      <span className="text-indigo-600 mb-[25px] text-[44px] font-bold">
        ToDo List
      </span>
      <div className="shadow-sm flex w-[700px] flex-col items-center p-[15px] rounded-[10px] bg-white">
        <Editor />
      </div>

      <div className="flex mt-[10px] flex-col overflow-y-auto max-h-[600px]">
        {loading === "success" &&
          tasks &&
          tasks.map((task: TTask) => (
            <Task onHandleEditTask={onHandleEditTask} key={task.id} {...task} />
          ))}
        {loading === "loading" && <Loading />}
      </div>
      <div className="h-[10px]" />
    </div>
  );
}

export default App;
