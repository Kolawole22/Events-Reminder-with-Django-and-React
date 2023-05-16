import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640); // Adjust the breakpoint as needed
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check initial size on component mount

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [name, setName] = useState<string>("there");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/signup/",
        {
          email: email,
          username: name,
          password: password,
        },
        {}
      );
      console.log("response is:", response.data); // The token and other data returned from the backend
      // Store the token in localStorage or elsewhere for future requests
      const { access, refresh } = response.data;

      // Store the tokens in localStorage or elsewhere for future requests
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Unauthorized (401) error
        // Handle the unauthorized error
        alert("Invalid credentials");
      } else {
        // Other error
        // Handle other errors
        alert("An error occurred during login:");
      }
      console.error(error);
    }
  };
  return (
    <div className="grid lg:grid-cols-2 bg-gradient-to-r m-0 from-indigo-500 via-purple-500 to-pink-500  w-screen h-auto ">
      {!isMobile && (
        <div className=" bg-sky-300 h-auto m-6 lg:mr-0 rounded-md lg:rounded-r-none   ">
          <div className="m-2 lg:m-8 w-80  ">
            <h1 className="font-bold text-sm lg:text-2xl text-white">
              EVENT CALENDAR
            </h1>
            <br />
            <div className="mt-12 max-w-full ">
              <br />
              <h1 className="text-xl font-bold text-white ">
                Welcome to Event CALENDAR{" "}
              </h1>
            </div>
            <br />
            <h3 className="break-words text-white">
              A way to make sure you never miss an important event
            </h3>
          </div>
        </div>
      )}
      <div className="bg-white m-6 lg:ml-0 rounded-lg lg:rounded-l-none">
        <div className="mt-12 flex-col justify-center">
          <h1 className=" font-bold text-center text-2xl lg:text-2xl text-blue-500">
            Signup
          </h1>
          <h3 className="text-gray-700 text-center text-sm ">
            welcome. Signup to set your Calendars
          </h3>
          <div className="flex justify-center mt-12">
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Email</label>
              <br />
              <input
                id="email"
                type="text"
                name="email"
                className="border border-black rounded-md p-1 "
                onChange={(e) => handleEmailChange(e)}
              />
              <br />
              <br />
              <label htmlFor="username">Username</label>
              <br />
              <input
                id="username"
                type="text"
                name="username"
                className="border border-black rounded-md p-1 "
                onChange={(e) => handleNameChange(e)}
              />
              <br />
              <br />
              <label htmlFor="password">Password</label>
              <br />
              <input
                id="password"
                type="password"
                name="password"
                className="border border-black rounded-md p-1"
                onChange={(e) => handlePasswordChange(e)}
              />
              <br />
              <br />
              <input
                type="submit"
                name="Sign up"
                className="bg-blue-300 hover:bg-blue-500 py-1 w-56 lg:w-48 border rounded-md"
              />
              <div>
                Have an account?{" "}
                <button
                  className="border-none bg-white hover:text-slate-400 outline-none hover:outline-none hover:border-none px-0"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
