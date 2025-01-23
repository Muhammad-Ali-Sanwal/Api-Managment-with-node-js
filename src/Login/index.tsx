import React, { FC } from "react";
import ModalDialog from "../components/model";
import SignUp from "./SignUp";

interface CreateEmployeeProps {
  open: boolean;
  onClose: () => void;
}

const CreateEmployee: FC<CreateEmployeeProps> = ({ open, onClose }) => {
  return (
    <ModalDialog
      open={open}
      onClose={onClose}
      title="Create User"
      description="This user will have access to your data in database"
      width="1500px"
    >
      <SignUp onClose={onClose} />
    </ModalDialog>
  );
};

export default CreateEmployee;
