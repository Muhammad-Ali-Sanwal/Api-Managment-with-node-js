import React, { FC, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface EmployeeFormProps {
  onClose: () => void;
}

const Login: FC<EmployeeFormProps> = ({ onClose }) => {
  const handleClose = () => {
    onClose();
  };
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.token);
        setformData({
          email: "",
          password: "",
        });
        localStorage.setItem("userName", data.name);
        handleClose();
        navigate("/admin");
      } else {
        toast.error(data.error || "Failed to log in");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Something went wrong, please try again");
    }
  };

  return (
    <>
      <form className="flex flex-col mx-auto gap-2" onSubmit={onSubmit}>
        <input
          className="border border-gray-400 p-2"
          type="email"
          placeholder="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          required
        />
        <input
          className="border border-gray-400 p-2"
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          required
          onChange={onChange}
        />
        <button type="submit" className="border border-black p-2">
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
