import { useState } from "react";
import UploadIcon from "./Icons/UploadIcon";
import Upload from "./Icons/UploadIcon";
// components/UI
import Button from "./UI/Button";
import Input from "./UI/Input";
import Textarea from "./UI/Textarea";

const Editor = () => {
  const [titleLocal, setTitleLocal] = useState<string>("");
  const [descriptionLocal, setDescriptionLocal] = useState<string>("");
  const [dateLocal, setDateLocal] = useState<string>("");

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="relative ">
          <Input
            value={titleLocal}
            onChange={(e: any) => setTitleLocal(e.target.value)}
            placeholder="Title"
          />
        </div>
        <div className="flex justify-between items-center">
          <Input
            value={dateLocal}
            onChange={(e: any) => setDateLocal(e.target.value)}
            variant="datetime"
            type="datetime-local"
          />

          <Button>
            <span className="mr-[5px]">Image</span>
            <UploadIcon size={20} color="white" />
          </Button>

          <Button className="ml-[10px]">
            <span>Save</span>
          </Button>
        </div>
      </div>
      <Textarea
        placeholder="description"
        value={descriptionLocal}
        onChange={(e: any) => setDescriptionLocal(e.target.value)}
        className="mt-[15px]"
      />
    </>
  );
};

export default Editor;
