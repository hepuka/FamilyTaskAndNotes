import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [department, setDepartment] = useState("");
  const navigate = useNavigate();
  const currentUserData = JSON.parse(localStorage.getItem("currentuser"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title !== "" && desc !== "" && department !== "") {
      await addDoc(collection(db, "todo"), {
        author: currentUserData.name,
        title: title,
        desc: desc,
        department: department,
        date: new Date().toLocaleDateString(),
        completed: false,
      });

      setTitle("");
      setDesc("");
      setDepartment("");

      navigate("/dashboard/tasks");
    } else {
      alert("Minden mező kitöltése kötelező!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mt-6 items-center justify-center gap-3 w-full pr-1 pl-1"
    >
      <input
        type="text"
        className="block p-2.5 w-full h-10 md:w-96 sm:w-96 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
        placeholder="Feladat neve"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        rows="4"
        className="block p-2.5 w-full md:w-96 sm:w-96 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
        placeholder="Add meg a feladat leírását..."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      ></textarea>
      <input
        type="text"
        className="block p-2.5 w-full h-10 md:w-96 sm:w-96 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
        placeholder="Feladattípus"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />
      <button className=" mt-5 text-xs bg-transparent dark:hover:bg-gray-700 text-gray-700 dark:text-white font-bold py-2 px-4 border border-gray-400 rounded shadow">
        Hozzáad
      </button>
    </form>
  );
}
