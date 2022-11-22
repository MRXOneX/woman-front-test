import { useRef } from "react";
//
import UploadIcon from "./Icons/UploadIcon";
import Button from "./UI/Button";

const FileUploader = ({ setFiles }: any) => {
  const hiddenFileInput: any = useRef<any>(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event: any) => {
    const fileUploaded = event.target.files[0];

    const nameFile = fileUploaded.name.split(".");

    setFiles((prev: any) => [
      ...prev,
      {
        name: nameFile[0],
        type: nameFile[1],
        url: URL.createObjectURL(fileUploaded),
      },
    ]);
  };

  return (
    <>
      <Button onClick={handleClick}>
        <span className="mr-[5px]">File</span>
        <UploadIcon size={20} color="white" />
      </Button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </>
  );
};

export default FileUploader;
