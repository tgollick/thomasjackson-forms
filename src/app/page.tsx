import { caller } from "@/trpc/server";

export default async function Home() {
  const title = await caller.hello();

  return (
    <main className="w-full h-full min-h-screen flex items-center justify-center text-4xl font-bold">
      {title.greeting}
    </main>
  );
}
