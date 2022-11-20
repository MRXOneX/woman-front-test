import { memo } from "react";
//
import { doc, deleteDoc, Timestamp } from "firebase/firestore";
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

dayjs.locale("ru");

const Task = ({ id, title, description, expiresAt }: TTask) => {
  const onDelete = async () => {
    try {
      await deleteDoc(doc(db, "tasks", id as string));
    } catch (error) {}
  };

  const dateHours = dayjs(expiresAt).diff(Timestamp.now().toMillis(), "hours");
  const dateMinutes = dayjs(expiresAt).diff(
    Timestamp.now().toMillis(),
    "minutes"
  );

  return (
    <div className="shadow-sm text-[18px] mt-[15px] justify-between items-center flex w-[700px] py-[10px] px-[15px] rounded-[10px] bg-white">
      <div className="flex items-center">
        <span>check</span>
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
          <button className="mr-[5px] hover:bg-[#8A63B91A] rounded-[10px] p-[5px]">
            <Edit color="#54b4d3" />
          </button>
          <button
            onClick={onDelete}
            className="hover:bg-[#B437371A] rounded-[10px] p-[5px]"
          >
            <Delete color="#e15264" />
          </button>
        </div>
        <div className="flex flex-col items-end">
          <span className="leading-[18px]">expires:</span>
          <span
            className={`${
              (dateHours.toString().split("")[0] === "-" || dateMinutes.toString().split("")[0] === "-")
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
