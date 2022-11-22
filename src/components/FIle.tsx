import { memo } from "react";
// components/Icons
import CloseIcon from "./Icons/CloseIcon";
// components/UI
import Button from "./UI/Button";

type FileProps = {
  url: string;
  name: string;
  type: string;

  setFiles: any;
};

const File = ({ url, name, type, setFiles }: FileProps) => {
  const onRemove = () => {
    setFiles((prev: any) => prev.filter((file: any) => file.url !== url));
  };

  return (
    <div className="bg-slate-200 flex items-center mt-[15px] mx-[15px] rounded-[10px] px-[10px] py-[5px]">
      <span className="font-medium truncate max-w-[100px] text-ellipsis overflow-hidden text-slate-800">
        {name}
      </span>
      <span className="mx-[8px] font-medium text-slate-800">
        .{type.toLocaleUpperCase()}
      </span>
      <Button
        onClick={onRemove}
        variant="text"
        className="cursor-pointer outline-none"
      >
        <CloseIcon color="blue" />
      </Button>
    </div>
  );
};

export default memo(File);
