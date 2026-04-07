import React from "react";
import zeerEventsLogo from "@/assets/Zeero-Events.png";
import comingSoon from "@/assets/coming-soon.png";
import bg from "@/assets/background.jpg";


const Holding: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-center bg-cover flex items-center justify-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="p-8 rounded-lg flex flex-col items-center gap-6">
        <img
          src={zeerEventsLogo}
          alt="Logo"
          className="max-w-xl"
          style={{ filter: "invert(1) brightness(3)" }}
        />
        <img src={comingSoon} alt="Label Image" className="max-w-md" />
      </div>
    </div>
  );
};

export default Holding;

