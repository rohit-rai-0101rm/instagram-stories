"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { User } from "../types";

const users: User[] = [
  {
    id: 1,
    name: "User 1",
    profileImage: "/user1.jpg",
    stories: ["/story1-1.jpg", "/story1-2.jpg"],
  },
  {
    id: 2,
    name: "User 2",
    profileImage: "/user2.jpg",
    stories: ["/story2-1.jpg", "/story2-2.jpg"],
  },
];

const UserList: React.FC = () => {
  const router = useRouter();

  const handleUserClick = (userId: number) => {
    router.push(`/stories/${userId}`);
  };

  return (
    <div className="flex gap-8 p-8 overflow-x-scroll no-scrollbar">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => handleUserClick(user.id)}
        >
          <img
            src={user.profileImage}
            alt={user.name}
            className="w-24 h-24 rounded-full border-2 border-gray-300"
          />
          <p className="mt-2 text-center">{user.name}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;