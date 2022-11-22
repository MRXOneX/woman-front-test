import { useState } from "react";
//
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
//
import uniqid from "uniqid";
//
import { db, storage } from "../firebase";
// components
import FileUploader from "./FIleUploader";
// components/UI
import Button from "./UI/Button";
import Input from "./UI/Input";
import Textarea from "./UI/Textarea";
// components/Icons
import File from "./FIle";
// types
import { TTask } from "../types/task";


const Editor = ({ title, description, expiresAt, filesUrl }: any) => {
  const [titleLocal, setTitleLocal] = useState<string>(title ?? "");
  const [descriptionLocal, setDescriptionLocal] = useState<string>(description ?? "");
  const [dateLocal, setDateLocal] = useState<string>("");
  const [files, setFiles] = useState<any>(filesUrl ?? []);

  const [loading, setLoading] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const onAdd = async () => {
    try {
      setLoading("loading");
      let newFilesUrl: any = [];

      files.forEach(async (file: any) => {
        const storageRef = ref(storage, `${file.name}.${file.type}`);
        await uploadBytes(storageRef, file);
      });
      files.forEach(async (file: any) => {
        await getDownloadURL(ref(storage, `${file.name}.${file.type}`)).then(
          (url: string) => {
            newFilesUrl = [
              ...newFilesUrl,
              {
                url,
                name: file.name,
                type: file.type,
              },
            ];
          }
        );
      });

      const id = uniqid("task-");
      const data: TTask = {
        id,
        isChecked: false,
        title: titleLocal,
        description: descriptionLocal,
        expiresAt: Timestamp.now().toMillis(),
        filesUrl: newFilesUrl,
      };
      await setDoc(doc(db, "tasks", id), data);
      setLoading("success");

      setTitleLocal("");
      setDescriptionLocal("");
      setDateLocal("");
      setFiles([]);
    } catch (error) {
      setLoading("error");
    }
  };

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

          <FileUploader setFiles={setFiles} />

          <Button
            onClick={onAdd}
            isLoading={loading === "loading"}
            className="ml-[10px]"
          >
            <span>Add</span>
          </Button>
        </div>
      </div>
      <Textarea
        placeholder="description"
        value={descriptionLocal}
        onChange={(e: any) => setDescriptionLocal(e.target.value)}
        className="mt-[15px]"
      />
      <div className="flex w-full flex-wrap justify-center items-center">
        {files?.length > 0 &&
          files.map((file: any) => (
            <File key={file.url} {...file} setFiles={setFiles} />
          ))}
      </div>
    </>
  );
};

export default Editor;
