import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const EditTodo = () => {
  let params = useParams();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [department, setDepartment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const docRef = doc(db, "todo", `${params.id}`);

    const getData = async () => {
      const docSnap = await getDoc(docRef);

      setTitle(docSnap.data().title);
      setDesc(docSnap.data().desc);
      setDepartment(docSnap.data().department);
    };

    getData();
  }, [params]);

  const handleEdit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "todo", params.id), {
      title: title,
      desc: desc,
      department: department,
      date: new Date().toLocaleDateString(),
      completed: false,
    });

    navigate("/dashboard/tasks");
  };

  return (
    <form className="flex flex-col mt-6 items-center justify-center gap-8 w-full bg-transparent pl-1 pr-1">
      <input
        type="text"
        className="block p-2.5 w-full h-10 md:w-96 sm:w-96 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
        placeholder="Feladat neve"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        rows="4"
        className="block p-2.5 w-full md:w-96 sm:w-96   text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
        placeholder="Add meg a feladat leírását..."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      ></textarea>

      <input
        type="text"
        className="block p-2.5 w-full h-10 md:w-96 sm:w-96 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
        placeholder="Feladat neve"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />
      <button
        onClick={handleEdit}
        className=" text-xs bg-transparent dark:hover:bg-gray-700 text-gray-700 dark:text-white font-bold py-2 px-4 border border-gray-400 rounded shadow"
      >
        Adatok módosítása
      </button>
    </form>
  );
};

export default EditTodo;
