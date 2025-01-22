import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
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

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    console.log("response", response);
    if (response.ok) {
      setformData({
        username: "",
        email: "",
        password: "",
        isAdmin: false,
      });
    } else {
      const data = await response.json();
      console.log("errooooooors frontend", data);
    }
  };

  return (
    <form
      className="flex flex-col w-1/4 mx-auto mt-20 gap-2"
      onSubmit={onSubmit}
    >
      <h1>Sign Up</h1>
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
        placeholder="email"
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
        Is this user is admin
      </label>

      <button type="submit" className="border border-black p-2">
        Sign Up
      </button>
      <Link to="/login">Login</Link>
    </form>
  );
};

export default SignUp;
