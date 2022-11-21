import { memo } from "react";
//
import { doc, deleteDoc, Timestamp, updateDoc } from "firebase/firestore";
//
import dayjs from "dayjs";
import "dayjs/locale/ru";
//
import { db } from "../firebase";
// types
import { TTask } from "../types/task";
// components/UI/Icons
import Delete from "./UI/Icons/Delete";
import Edit from "./UI/Icons/Edit";
import Button from "./UI/Button";

dayjs.locale("ru");

interface TaskProps extends TTask {
  onHandleEditTask: any;
}

const Task = ({
  onHandleEditTask,
  id,
  isChecked,
  title,
  description,
  expiresAt,
}: TaskProps) => {
  const taskRef = doc(db, "tasks", id as string);

  const onDelete = async () => {
    try {
      await deleteDoc(taskRef);
    } catch (error) {}
  };

  const onChangeCheck = async (isCheck: boolean) => {
    await updateDoc(taskRef, {
      isChecked: isCheck,
    });
  };

  const dateHours = dayjs(expiresAt).diff(Timestamp.now().toMillis(), "hours");
  const dateMinutes = dayjs(expiresAt).diff(
    Timestamp.now().toMillis(),
    "minutes"
  );

  return (
    <div className="shadow-sm text-[18px] mt-[15px] justify-between items-center flex w-[700px] py-[10px] px-[15px] rounded-[10px] bg-white">
      <div className="flex items-center">
        <label className="flex items-center">
          <input
            checked={isChecked}
            onChange={(e) => onChangeCheck(e.target.checked)}
            type="checkbox"
            name="checked-demo"
            className="form-tick cursor-pointer appearance-none bg-white bg-check h-[20px] w-[20px] border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none"
          />
        </label>
        <div className="flex ml-[10px] flex-col">
          <span className="leading-[26px] w-[500px] text-ellipsis overflow-hidden font-medium text-slate-800 text-[22px]">
            {title}
          </span>
          <span className="leading-[26px] break-all text-[18px] text-stone-500">
            {description}
          </span>
        </div>
      </div>
      <div className="flex  items-end flex-col">
        <div className="flex items-center">
          <Button onClick={() => onHandleEditTask(id)} type="text">
            <Edit color="#54b4d3" />
          </Button>
          <Button className="ml-[4px]" onClick={onDelete} type="text">
            <Delete color="#e15264" />
          </Button>
        </div>
        <div className="flex flex-col items-end">
          <span className="leading-[18px]">expires:</span>
          <span
            className={`${
              dateHours.toString().split("")[0] === "-" ||
              dateMinutes.toString().split("")[0] === "-"
                ? "text-red-400"
                : "text-indigo-400"
            } leading-[18px]`}
          >
            {dateHours === 0 ? dateMinutes : dateHours}{" "}
            {dateHours === 0 ? "minutes" : "hours"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(Task);
