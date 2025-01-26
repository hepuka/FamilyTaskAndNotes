import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Footer from "./Footer";
import { IoIosLogIn } from "react-icons/io";
import { MdOutlineAppRegistration } from "react-icons/md";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const getCurrentUser = async (docRef) => {
    const docSnap = await getDoc(docRef);
    localStorage.setItem("currentuser", JSON.stringify(docSnap.data()));
    navigate("/dashboard");
  };

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const docRef = doc(db, "users", `${user.photoURL}`);

        getCurrentUser(docRef);
      })
      .catch((error) => {
        alert("Hibás bejelentkezési adat!");
      });
  };

  return (
    <div className="container flex flex-col items-center justify-around mt-5 gap-3 h-screen dark:bg-gray-900">
      <div className="w-48 h-48">
        <img
          className="h-full w-full rounded-full"
          src="/logo2.png"
          alt="logo"
        />
      </div>

      <form className="w-full px-8">
        <div className="mb-5">
          <label className="block mb-2 text-xs font-medium text-gray-700 dark:text-white">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow-sm  border border-gray-300 text-gray-900 bg-transparent text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Add meg az email címet"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-xs text-gray-700 dark:text-white">
            Jelszó
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-sm border border-gray-300 text-gray-900 text-xs bg-transparent rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Add meg a jelszót"
            required
          />
        </div>

        <div className="flex gap-3 items-center">
          <button
            type="submit"
            onClick={signIn}
            className=" flex justify-center items-center text-xs bg-transparent dark:hover:bg-gray-700 dark:text-white font-bold py-2 px-4 border border-gray-400 rounded shadow"
          >
            <span className="mr-2">
              <IoIosLogIn />
            </span>
            <div>Belépés</div>
          </button>
          <Link
            className="flex justify-center items-center text-xs bg-transparent dark:hover:bg-gray-700 dark:text-white font-bold py-2 px-4 border border-gray-400 rounded shadow"
            to={"/register"}
          >
            <span className="mr-2">
              <MdOutlineAppRegistration />
            </span>
            <div>Regisztráció</div>
          </Link>
        </div>
      </form>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
