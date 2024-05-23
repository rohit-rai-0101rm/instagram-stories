import UserList from "@/components/UserList";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-white flex-col items-center justify-between p-24">
      <UserList />
    </main>
  );
}
