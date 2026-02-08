import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/Student";
import Card from "../components/Card";
import Input from "../components/Input";
import Logo from "../components/Logo";
import { CiLogin } from "react-icons/ci";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const fillDemoCredentials = () => {
    setFormData({ email: "student@example.com", password: "student123" });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div
      className="
    min-h-screen flex items-center 
    justify-center bg-gray-100
    bg-gradient-to-r from-violet-50 to-white flex-col px-4 sm:px-8
    
    "
    >
      <div className="mt-10"></div>
      <Logo className="rounded-2xl" />
      <div className="my-6">
        <h1 className=" mb-4 text-center font-bold text-3xl">AttendanceMS</h1>
        <p className="mb-4 text-center text-gray-500">Log Into Your Account</p>
      </div>
      <Card className="max-w-md mx-auto">
        <h2 className="text-lg text-center font-semibold mb-4 text-gray-900">
          Student Sign In
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.mail@university.edu"
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <CiLogin className="text-xl -mb-0.5 " />
            <span>Sign In</span>
          </button>
        </form>
      </Card>
      <Card className="mt-8 mb-10 max-w-md mx-auto">
        <h1 className="text-lg">Quick Demo access</h1>
        <p className=" text-gray-600 mt-3">
          Click below to login with demo credentials
        </p>
        <button
          type="button"
          onClick={fillDemoCredentials}
          className="mt-4 w-full bg-white border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors p-3 rounded-xl text-left group"
        >
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 bg-indigo-100 text-green-600 rounded-xl text-lg group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
              S
            </div>
            <div>
              <div className="font-semibold text-gray-900">Student Access</div>
              <div className="text-sm text-gray-500">
                Mark Attendance and View Courses
              </div>
            </div>
          </div>
        </button>
      </Card>
    </div>
  );
}

export default Login;
