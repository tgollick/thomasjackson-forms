import React from "react";
import LoginForm from "./_components/LoginForm";

type Props = {};

const Page = (props: Props) => {
  return (
    <main className="w-full h-full min-h-screen flex items-center justify-center">
      <LoginForm />
    </main>
  );
};

export default Page;
