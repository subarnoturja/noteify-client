import { useForm } from "react-hook-form";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { Link } from "react-router-dom";

const Register = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    const { name, email, password} = data;
    console.log(name, email, password);
  };

  return (
    <section className="py-10 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xlsm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Register
          </h2>
        </div>

        <div className="relative max-w-md shadow-lg mx-auto mt-8 md:mt-16">
          <div className="overflow-hidden bg-white rounded-md shadow-md">
            <div className="px-4 py-6 sm:px-8 sm:py-7">
              <form onSubmit={handleSubmit(onSubmit)} action="#" method="POST">
                <div className="space-y-5">
                  <div>
                    <label className="text-base font-medium text-gray-900">
                      {" "}
                      First Name 
                    </label>
                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        {/* react icons */}
                        <FaRegUser size={18}></FaRegUser>
                      </div>

                      <input
                        type="text"
                        {...register("name", { required: true })}
                        placeholder="Enter your full name"
                        className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                      />
                      {errors.name && <span className="text-red-500">This field is required</span>}
                    </div>
                  </div>

                  <div>
                    <label className="text-base font-medium text-gray-900">
                      {" "}
                      Email address{" "}
                    </label>
                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        {/* react icons */}
                        <MdOutlineEmail size={18}></MdOutlineEmail>
                      </div>

                      <input
                        type="email"
                        {...register("email", { required: true })}
                        placeholder="Enter email to get started"
                        className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                      />
                      {errors.email && <span className="text-red-500">This field is required</span>}
                    </div>
                  </div>

                  <div>
                    <label className="text-base font-medium text-gray-900">
                      {" "}
                      Password{" "}
                    </label>
                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        {/* react icon */}
                        <TbLockPassword size={18}></TbLockPassword>
                      </div>

                      <input
                        type="password"
                        {...register("password", { required: true })}
                        placeholder="Enter your password"
                        className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                      />
                      {errors.password && <span className="text-red-500">This field is required</span>}
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                    >
                      Create account
                    </button>
                  </div>

                  <div className="text-center">
                    <p className="text-base text-gray-600">
                      Already have an account?{" "}
                      <Link
                        to='/login'
                        title=""
                        className="font-medium text-orange-500 transition-all duration-200 hover:text-orange-600 hover:underline"
                      >
                        Login here
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
