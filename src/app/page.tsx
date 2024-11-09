import { serverClient } from "../trpc/serverClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  const users = await serverClient.getUsers.query();
  console.log(users);

  return (
    <main className="max-w-3xl mx-auto mt-5">
      {/* <TodoList initialTodos={todos} /> */}
      <div className="text-black">test</div>
    </main>
  );
}
