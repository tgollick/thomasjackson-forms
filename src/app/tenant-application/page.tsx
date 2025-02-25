import React from "react";
import TenantApplicationForm from "./TenantApplicationForm";

type Props = {};

const Page = (props: Props) => {
  return (
    <main className="w-full h-full min-h-screen flex items-center justify-center">
      <TenantApplicationForm />
    </main>
  );
};

export default Page;
