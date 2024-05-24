"use client";
import React, { useState } from "react";
import { User } from "../types";
import StoryViewer from "../components/StoryViewer";

const users: User[] = [
  {
    id: 1,
    name: "User 1",
    profileImage: "https://cdn-icons-png.flaticon.com/512/236/236832.png",
    stories: [
      "https://img.redbull.com/images/c_crop,x_545,y_0,h_2194,w_1755/c_fill,w_450,h_600/q_auto:low,f_auto/redbullcom/2017/08/15/65b3282e-0c0d-4a39-b077-84820e75ab39/cristiano-ronaldo-gol-sevinci",
      "https://www.cristianoronaldo.com/assets/images/brand_fragrances.jpg?t=3103296480",
    ],
  },
  {
    id: 2,
    name: "User 2",
    profileImage:
      "https://static.vecteezy.com/system/resources/thumbnails/019/896/012/small_2x/female-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
    stories: [
      "data:image/jpeg;base64,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",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi8kVs0YHJiGwemF0H-UHRLGoiD42F6HEEjf1hVTRNnQ&s",
    ],
  },
  {
    id: 3,
    name: "User 3",
    profileImage: "https://cdn-icons-png.flaticon.com/512/706/706830.png",
    stories: [
      "https://img.redbull.com/images/c_crop,x_545,y_0,h_2194,w_1755/c_fill,w_450,h_600/q_auto:low,f_auto/redbullcom/2017/08/15/65b3282e-0c0d-4a39-b077-84820e75ab39/cristiano-ronaldo-gol-sevinci",
      "https://www.cristianoronaldo.com/assets/images/brand_fragrances.jpg?t=3103296480",
    ],
  },
  {
    id: 4,
    name: "User 4",
    profileImage: "https://cdn-icons-png.flaticon.com/512/924/924874.png",
    stories: [
      "https://img.redbull.com/images/c_crop,x_545,y_0,h_2194,w_1755/c_fill,w_450,h_600/q_auto:low,f_auto/redbullcom/2017/08/15/65b3282e-0c0d-4a39-b077-84820e75ab39/cristiano-ronaldo-gol-sevinci",
      "https://www.cristianoronaldo.com/assets/images/brand_fragrances.jpg?t=3103296480",
    ],
  },
];

const UserList: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="relative container py-4 md:py-16">
      <h2 className="heading">Instagram</h2>
      <div className="flex items-center gap-4 py-4 overflow-x-auto overflow-y-hidden">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleUserClick(user)}
          >
            <figure className="w-24 h-24 rounded-full p-[2px] overflow-hidden grid place-content-center instagram">
              <img
                src={user.profileImage}
                alt={user.name}
                className="max-w-full border-[3px] border-white rounded-full"
              />
            </figure>
            <p className="mt-2 text-black text-center">{user.name}</p>
          </div>
        ))}
      </div>
      {selectedUser && <StoryViewer user={selectedUser} onClose={closeModal} />}
    </div>
  );
};

export default UserList;
