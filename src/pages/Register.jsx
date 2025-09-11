import React, { useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/register", { name, email, password, role });
      console.log(res.data.data.message);
      if (res.data.status === "success") {
        toast.success(res.data.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="flex flex-col gap-y-2">
      <div>
        <h1 className="font-bold text-center text-2xl m-2 p-1">
          Register your <br />
          <span className="text-purple-500">Skillify</span> Account
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* name */}
        <div>
          <label htmlFor="name" className="text-xl font-serif">
            Name<span className="text-red-700">*</span>
          </label>
          <br />
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-purple-400 my-1 w-full rounded-md p-2 focus:outline-purple-700"
          />
        </div>

        {/* email */}
        <div>
          <label htmlFor="email" className="text-xl font-serif">
            Email<span className="text-red-700">*</span>
          </label>
          <br />
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-purple-400 my-1 w-full rounded-md p-2 focus:outline-purple-700"
          />
        </div>

        {/* password */}
        <div className="my-3">
          <label htmlFor="password" className="text-xl font-serif">
            Password<span className="text-red-700">*</span>
          </label>
          <br />
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-purple-400 my-1 w-full rounded-md p-2 focus:outline-purple-700"
          />
        </div>

        {/* role */}
        <div className="my-3">
          <label className="text-xl font-serif block mb-1">
            Role<span className="text-red-700">*</span>
          </label>
          <div className="p-2 flex justify-between">
            <label
              htmlFor="admin"
              className="inline-flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="role"
                id="admin"
                value="admin"
                checked={role === "admin"}
                onChange={(e) => setRole(e.target.value)}
                className="cursor-pointer"
              />
              Admin
            </label>

            <label
              htmlFor="student"
              className="inline-flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="role"
                id="student"
                value="student"
                checked={role === "student"}
                onChange={(e) => setRole(e.target.value)}
                className="cursor-pointer"
              />
              Student
            </label>

            <label
              htmlFor="instructor"
              className="inline-flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="role"
                id="instructor"
                value="instructor"
                checked={role === "instructor"}
                onChange={(e) => setRole(e.target.value)}
                className="cursor-pointer"
              />
              Instructor
            </label>
          </div>
        </div>

        {/* submit */}
        <button
          type="submit"
          className="bg-purple-800 text-white w-full rounded-md h-10 cursor-pointer font-sans"
        >
          Register
        </button>
        <p className="text-center font-sans  my-2 p-1">
          Already a member?
          <Link to="/login" className="text-purple-700">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Register;
