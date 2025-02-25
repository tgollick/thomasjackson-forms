import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { caller } from "@/trpc/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const tokenCookie = cookieStore.get("authToken");

  if (!tokenCookie) {
    console.log("No JWT found in cookies");
    redirect("/login");
  }

  const user = await caller.auth.getUser({ token: tokenCookie.value });

  if (!user || !("email" in user)) {
    console.error("Cannot find user info from JWT provided");
    redirect("/login");
  }

  const { email } = user;

  return (
    <SidebarProvider>
      <AppSidebar email={email} />
      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
