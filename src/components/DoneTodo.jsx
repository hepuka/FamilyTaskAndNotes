import React from "react";

export default function DoneTodo({ todo }) {
  return (
    <div className="flex w-full min-h-24 justify-between">
      <div className="flex flex-col justify-between w-full gap-3">
        <div className="flex items-start justify-between">
          <div className="h-full w-16 mr-3">
            <img src="/logo.jpg" alt="" />
          </div>
          <div className=" flex flex-col w-full text-xs">
            <p className="text-sm font-bold">{todo.title}</p>
            <p className="text-xs dark:text-gray-300">{todo.date}</p>
            <p className="text-xs dark:text-gray-300"> #{todo.department}</p>
          </div>
        </div>
        <div className=" flex text-xs w-full h-full">
          <p className="text-justify text-sm dark:text-gray-200">{todo.desc}</p>
        </div>
      </div>
    </div>
  );
}
