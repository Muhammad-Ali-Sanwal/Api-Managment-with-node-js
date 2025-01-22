import { Route, Routes } from "react-router-dom";
import "./App.css";
import Contact from "./components/fetchAPIs/Contact";
import FetchDataFromMongoDB from "./components/fetchAPIs/FetchDataFromMongoDB";
import SignUp from "./Login/SignUp";
import Login from "./Login/Login";
import User from "./Login/User";
// import { createContext, useState } from "react";
// import FetchUsers from "./components/FetchUsers";
// import JsonPaceholderApi from "./components/JsonPaceholderApi";
// import ContextHook from "./components/hooks/ContextHook";
// import { UserContext } from "./components/lib/context";
// import ArrayFill from "./components/ArrayFill";
// import FetchCurrency from "./components/FetchCurrency";
// import RandomJokes from "./components/RandomJokes";
// import RandomDogs from "./components/RandomDogs";
// import FetchCountries from "./components/FetchCountries";
// import FetchDataFromMongoDB from "./components/fetchAPIs/FetchDataFromMongoDB";

function App() {
  return (
    <>
      <Routes>
        {/* <UserContext> */}
        {/* <div className="App"> */}
        {/* <FetchUsers /> */}
        {/* <JsonPaceholderApi/> */}
        {/* <ContextHook /> */}
        {/* <ArrayFill /> */}
        {/* <FetchCurrency /> */}
        {/* <RandomJokes /> */}
        {/* <RandomDogs /> */}
        {/* <FetchCountries /> */}
        {/* <FetchDataFromMongoDB /> */}
        {/* <Contact />
        <FetchDataFromMongoDB /> */}
        {/* <SignUp /> */}
        {/* </div> */}
        {/* </UserContext> */}

        <Route path="/" element={<FetchDataFromMongoDB />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </>
  );
}

export default App;
