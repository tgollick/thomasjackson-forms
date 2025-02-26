import React from "react";
import FileUpload from "./fileUpload";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center text-4xl font-bold">
      <FileUpload />
    </div>
  );
};

export default page;
