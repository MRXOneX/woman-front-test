import { memo } from "react";
import Button from "../components/UI/Button";
import CloseIcon from "../components/Icons/CloseIcon";

const Modal = ({ isOpen, content, onClose }: any) => {
  return (
    <div
      className={`h-full w-full ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center absolute z-10 bg-[#02020233]`}
    >
      {/* CONTENT */}
      <div className="bg-white relative rounded-[10px] p-[15px]">
        <Button className="absolute right-[-40px] top-[-30px]" onClick={onClose} variant="transparent">
          <CloseIcon color="blue" />
        </Button>

        {content}
      </div>
    </div>
  );
};

export default memo(Modal);
