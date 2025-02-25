"use client";

import React from "react";
import { Button } from "./ui/button";
import { LucideLogOut, Router } from "lucide-react";
import { toast } from "sonner";
import { caller } from "@/trpc/server";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type Props = {};

const LogoutButton = (props: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const logoutMutation = useMutation(trpc.auth.logout.mutationOptions());

  const handleLogout = async () => {
    try {
      return await logoutMutation
        .mutateAsync()
        .then(() => {
          toast("Logged Out Successfully");
        })
        .finally(() => {
          router.push("/login");
        });
    } catch (err) {
      toast("Error signing out: " + err);
    }
  };

  return (
    <Button className="w-full" onClick={() => handleLogout()}>
      Logout <LucideLogOut />
    </Button>
  );
};

export default LogoutButton;
