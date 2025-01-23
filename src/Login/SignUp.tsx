import React, { FC, useState } from "react";
import toast from "react-hot-toast";

interface SignUpProps {
  onClose: () => void;
}
const SignUp: FC<SignUpProps> = ({ onClose }) => {
  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setformData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setformData({
          username: "",
          email: "",
          password: "",
          isAdmin: false,
        });
        toast.success(data.message);
        onClose();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <>
      <form className="flex flex-col mx-auto gap-2" onSubmit={onSubmit}>
        <input
          className="border border-gray-400 p-2"
          type="text"
          placeholder="Username"
          required
          name="username"
          value={formData.username}
          onChange={onChange}
        />
        <input
          className="border border-gray-400 p-2"
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          required
          onChange={onChange}
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
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={onChange}
          />
          Is this user an admin?
        </label>

        <button type="submit" className="border border-black p-2">
          Sign Up
        </button>
      </form>
    </>
  );
};

export default SignUp;
