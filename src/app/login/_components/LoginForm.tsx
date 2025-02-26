"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

const LoginForm = () => {
  const router = useRouter();
  const trpc = useTRPC();

  const mutation = useMutation(trpc.auth.login.mutationOptions());

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await mutation.mutateAsync({
        email: values.email,
        password: values.password,
      });

      if (!response) {
        toast("Error fetching login API, please try again");
      }

      toast(response.message);

      if (response.success) {
        router.push(`/login/${values.email}/verify`);
      }
    } catch (error) {
      toast("Error fetching login API, please try again: " + error);
    }
  }

  return (
    <Card className="w-full max-w-[350px]">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-semibold">
          Dashboard Login
        </CardTitle>
        <CardDescription>
          Login to Thomas Jackson admin dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="shannon@example.com" {...field} />
                  </FormControl>
                  <FormDescription>Your login email address</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription>Your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {mutation.isPending ? (
                <div className="loader"></div>
              ) : (
                <>Submit</>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
