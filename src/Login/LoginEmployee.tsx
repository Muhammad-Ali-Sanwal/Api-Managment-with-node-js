import React, { FC } from "react";
import ModalDialog from "../components/model";
import SignUp from "./SignUp";
import Login from "./Login";

interface CreateEmployeeProps {
  open: boolean;
  onClose: () => void;
}

const LoginEmployee: FC<CreateEmployeeProps> = ({ open, onClose }) => {
  return (
    <ModalDialog
      open={open}
      onClose={onClose}
      title="Login"
      description="Enter your credientals to login"
      width="1500px"
    >
      <Login onClose={onClose} />
    </ModalDialog>
  );
};

export default LoginEmployee;
