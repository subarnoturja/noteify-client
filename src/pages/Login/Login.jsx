import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline } from "react-icons/io5";
import { TbEyeClosed } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { Bounce, toast } from "react-toastify";

const Login = () => {
  const [show, setShow] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password } = data;

    // Login Api
    try {
      const response = await axiosInstance.post('/login', {
        email: email,
        password: password,
      })

      if(response.data && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken)
        navigate('/')
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }
      else{
        toast.error('Please Try Again', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
      }
    }
  };

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div className="w-full mx-auto mt-28 max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800">
      <h1 className="text-2xl font-bold text-center">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-1 text-sm">
          <label className="dark:text-gray-600">Email</label>
          <input
            type="text"
            placeholder="Enter email"
            {...register("email", { required: true })}
            className="w-full px-4 py-3 rounded-md border-2"
          />
          {errors.email && <span className="text-red-500">This field is required</span>}
        </div>
        <div className="space-y-1 text-sm">
          <label className="dark:text-gray-600">Password</label>
            <div className="flex justify-between items-center">
              <input
                type={show ? "text" : "password"}
                {...register("password", { required: true })}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-md border-2"
              />
              <p className="absolute ml-80" onClick={handleShow}>
                {show ? (
                    <TbEyeClosed className="text-xl cursor-pointer"></TbEyeClosed>
                ) : (
                    <IoEyeOutline className="text-xl cursor-pointer"></IoEyeOutline>
                )}
              </p>
            </div>   
            {errors.password && <span className="text-red-500">This field is required</span>}
        </div>
        <button
          type="submit"
          className="block w-full p-3 text-center rounded-lg dark:text-gray-50 dark:bg-violet-600"
        >
          Sign in
        </button>
      </form>
      <div className="flex items-center pt-4 space-x-1">
        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
        <p className="px-3 text-sm dark:text-gray-600">
          Login with social accounts
        </p>
        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
      </div>
      <div className="flex justify-center space-x-4">
        <button aria-label="Log in with Google" className="p-3 rounded-sm">
          <FcGoogle size={25}></FcGoogle>
        </button>
        <button aria-label="Log in with Twitter" className="p-3 rounded-sm">
          <FaGithub size={25}></FaGithub>
        </button>
      </div>
      <p className="text-xs text-center sm:px-6 dark:text-gray-600">
        New in here?{" "}
        <Link to="/register" href="#" className="underline dark:text-gray-800">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
