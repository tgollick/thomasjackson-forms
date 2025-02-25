import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LockIcon } from "lucide-react";
import tjLogo from "../../public/tj-logo.svg";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full">
      {/* Admin login button */}
      <div className="absolute left-4 top-4 opacity-20 transition-opacity hover:opacity-100">
        <Link href="/login">
          <Button variant="ghost" size="icon">
            <LockIcon className="h-4 w-4" />
            <span className="sr-only">Admin Login</span>
          </Button>
        </Link>
      </div>

      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        {/* Logo section with animation */}
        <div className="mb-12 animate-fade-in">
          <div className="relative">
            <div className="absolute -inset-0.5 rounded-full bg-primary/20 blur" />
            <div className="relative rounded-full p-1">
              <Image
                src={tjLogo}
                alt="Thomas Jackson Logo"
                width="175"
                height="175"
                className="h-32 w-32 transform transition-transform duration-700 hover:scale-105 md:h-44 md:w-44"
              />
            </div>
          </div>
        </div>

        {/* Cards section */}
        <div className="flex w-full max-w-md flex-col gap-4">
          <Link href="/tenant-application" className="group">
            <Card className="p-6 transition-all duration-300 hover:border-primary/50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold md:text-2xl">
                    Tenant Application
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Apply for property rental
                  </p>
                </div>
                <div className="transform text-primary transition-transform duration-300 group-hover:translate-x-1">
                  →
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/buyer-offer" className="group">
            <Card className="p-6 transition-all duration-300 hover:border-primary/50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold md:text-2xl">
                    Buyer Offer
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Submit a property offer
                  </p>
                </div>
                <div className="transform text-primary transition-transform duration-300 group-hover:translate-x-1">
                  →
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  );
}
