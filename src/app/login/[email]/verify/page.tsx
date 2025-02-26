"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React, { useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { LoaderPinwheel, Router } from "lucide-react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

const Page = () => {
  const [value, setValue] = useState("");

  const params = useParams();
  // Add type checking and provide a default or handle the potential undefined case
  const email = params.email as string;
  const decodedEmail = decodeURIComponent(email);
  const trpc = useTRPC();
  const router = useRouter();

  const verifyMutation = useMutation(trpc.auth.verify2fa.mutationOptions({}));

  if (!email) {
    router.push("/login");
  }

  const handleVerify2FA = async (code: string) => {
    console.log(decodedEmail);
    try {
      const response = await verifyMutation.mutateAsync({
        code,
        email: decodedEmail,
      });

      if (!response) {
        toast("Error verifying 2FA code, please try again");
      }

      toast(response.message);

      if (response.success) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    } catch (err) {
      return {
        success: false,
        message: "Error verifying 2FA code, please try again: " + err,
      };
    }
  };

  return (
    <main className="w-full h-full min-h-screen flex items-center justify-center">
      <Card className="flex flex-col items-center text-center">
        <CardHeader>
          <h1 className="text-2xl font-bold">Enter Verification Code</h1>
          <p>A verification code has been sent to your email address.</p>
        </CardHeader>
        <CardContent>
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            onChange={(value) => setValue(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </CardContent>

        <CardFooter>
          <Button
            className="w-full"
            onClick={() => {
              handleVerify2FA(value);
            }}
          >
            {verifyMutation.isPending ? (
              <div className="loader"></div>
            ) : (
              <>Verify Code</>
            )}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};

export default Page;
