import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="flex flex-col justify-center items-center w-full mt-2 py-2 ">
      <p className="text-xs mb-1">
        Készítette: Kun-Fagyal Zoltán &copy; {year}
      </p>
      <p className="text-xs">Minden jog fenntartva!</p>
    </div>
  );
};

export default Footer;
