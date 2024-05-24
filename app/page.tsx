import UserList from "@/components/UserList";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-white flex-col items-center justify-between">
      <UserList />
    </main>
  );
}
