import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/Student";
import Card from "../components/Card";
import Input from "../components/Input";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    bg-gradient-to-r from-violet-50 to-white
    
    "
    >
      <Card>
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
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Login
          </button>
        </form>
      </Card>
    </div>
  );
}

export default Login;
