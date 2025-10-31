import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/slices/userSlice.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  const navigateto = useNavigate();
  const dispatch = useDispatch();

  const handlerLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateto("/");
    }
  }, [dispatch, loading, isAuthenticated]);
  return (
    <>
      <section className="w-full m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center">
        <div className="bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md shadow-xl sm:w-[600px] sm:h-[450px]">
          <h1 className="text-orange-500 text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl underline ">
            Login
          </h1>
          <form className="flex flex-col gap-5 w-full" onSubmit={handlerLogin}>
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-stone-500">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-[16px] py-2 bg-transparent border-b-2 border-black focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-stone-500">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-[16px] py-2 bg-transparent border-b-2 border-black focus:outline-none"
              />
            </div>
            <button
              className="bg-transparent font-bold hover:text-white hover:bg-orange-500 transition-all duration-300 text-xl mx-auto px-40 my-10 py-2 rounded-xl border-2 shadow-xl"
              type="submit"
            >
              {loading ? "Logging In... " : "Login"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
