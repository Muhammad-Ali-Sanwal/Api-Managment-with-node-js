import React from "react";
import useToggle from "./model/useToggle";
import CreateEmployee from "../Login";
import LoginEmployee from "../Login/LoginEmployee";

const RootComponent = () => {
  const createEmployeeToggle = useToggle();
  const createLoginToggle = useToggle();

  return (
    <div className="ml-24 mt-24 flex gap-5">
      <button
        className="border border-black px-2"
        onClick={createEmployeeToggle.setToOpen}
      >
        SignUp
      </button>
      <button
        className="border border-black p-2"
        onClick={createLoginToggle.setToOpen}
      >
        Login
      </button>
      <CreateEmployee
        open={createEmployeeToggle.isOpen}
        onClose={createEmployeeToggle.setToClose}
      />
      <LoginEmployee
        open={createLoginToggle.isOpen}
        onClose={createLoginToggle.setToClose}
      />
    </div>
  );
};

export default RootComponent;
