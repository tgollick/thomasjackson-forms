import { caller } from "@/trpc/server";
import Image from "next/image";
import Link from "next/link";
import tjLogo from "../../public/tj-logo.svg";
import { Card } from "@/components/ui/card";

export default async function Home() {
  return (
    <main className="w-full h-full min-h-screen flex flex-col items-center justify-center text-4xl font-bold space-y-8">
      <Image src={tjLogo} alt="Thomas Jackson Logo" width="175" height="175" />
      <div className="font-normal text-xl flex flex-col space-y-4 text-center">
        <Link href="/tenant-application">
          <Card className="py-4 px-6">Tenant Application Form</Card>
        </Link>

        <Link href="/buyer-offer">
          <Card className="py-4 px-6">Buyer Offer Form</Card>
        </Link>
      </div>
    </main>
  );
}
