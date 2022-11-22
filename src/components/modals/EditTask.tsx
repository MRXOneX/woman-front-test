import { useEffect, useState } from "react";
//
import { doc, getDoc } from "firebase/firestore";
//
import { db } from "../../firebase";
//
import Editor from "../Editor";
// types
import { TTask } from "../../types/task";
import Loading from "../Loading";

const EditTask = ({ taskId }: any) => {
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
      {loadingGetTask === "success" && task && <Editor />}
    </div>
  );
};

export default EditTask;
