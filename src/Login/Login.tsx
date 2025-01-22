import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const nevigate = useNavigate();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("data", data);
      setformData({
        email: "",
        password: "",
      });
      localStorage.setItem("userName", data.name);
      nevigate("/user");
    } else {
      const data = await response.json();
      console.log("errooooooors frontend", data);
    }
  };

  return (
    <>
      <form
        className="flex flex-col w-1/4 mx-auto mt-20 gap-2"
        onSubmit={onSubmit}
      >
        <h1>Login</h1>
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
        <Link to="/signup">SignUp</Link>
      </form>
    </>
  );
};

export default Login;
