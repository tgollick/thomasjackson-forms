import React from "react";
import DepositMortgage from "./formSections/depositMortgage";
import IdentificationFunds from "./formSections/identificationFunds";
import { BriefcaseBusiness, FileQuestion, FileText, User } from "lucide-react";
import PersonalInfo from "./formSections/personalInfo";
import PoliticalDeclaration from "./formSections/politicalDeclaration";

type Props = {};

const formSections = [
  {
    title: "Personal Information",
    description: "Enter your personal and contact information",
    component: <PersonalInfo />,
    schema: personalInfoSchema,
    icon: <User className="h-5 w-5" />,
  },
  {
    title: "Identification & Funds",
    description: "Upload identification and proof of funds",
    component: <IdentificationFunds />,
    schema: identificationFundsSchema,
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Deposit & Mortgage",
    description: "Enter deposit and mortgage details",
    component: <DepositMortgage />,
    schema: depositMortgageSchema,
    icon: <BriefcaseBusiness className="h-5 w-5" />,
  },
  {
    title: "Political Declaration",
    description: "Declare politically exposed status",
    component: <PoliticalDeclaration />,
    schema: politicalDeclarationSchema,
    icon: <FileQuestion className="h-5 w-5" />,
  },
];

const page = (props: Props) => {
  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center text-4xl font-bold">
      <p>Buyer Offer</p>
    </div>
  );
};

export default page;
