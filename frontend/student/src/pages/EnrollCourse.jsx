import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { enrollCourse } from "../api/Student";
import Input from "../components/Input";
import Card from "../components/Card";
import { LuBookOpen } from "react-icons/lu";
import { IoIosCheckmark } from "react-icons/io";

function EnrollCourse() {
  const [formData, setFormData] = useState({
    courseCode: "",
    enrollmentKey: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await enrollCourse(formData.courseCode, formData.enrollmentKey);
      setSuccess("Successfully enrolled in course!");
      setFormData({ courseCode: "", enrollmentKey: "" });
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setError("Failed to enroll. Check course code or enrollment key.");
    }
  };

  // Clear messages after 5 seconds
  useEffect(() => {
    if (!error && !success) return;

    const timer = setTimeout(() => {
      setError("");
      setSuccess("");
    }, 3500);

    return () => clearTimeout(timer);
  }, [error, success]);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center space-y-6">
      <div className="w-full max-w-md space-y-2">
        <h1 className="text-2xl font-bold">Enroll in a Course</h1>

        <p className="text-gray-600 text-sm leading-relaxed">
          Enter the course code and enrollment key provided by your lecturer to
          join a course. Once enrolled, it will appear in your dashboard where
          you can then track attendance.
        </p>
      </div>
      {/* Enrollment Form */}
      <Card className="w-full max-w-md p-6 sm:p-8 bg-white rounded-xl shadow-sm">
        <div className="flex gap-2 items-center font-semibold text-lg mb-6">
          <LuBookOpen />
          Course Enrollment
        </div>

        {error && (
          <p className="text-red-700 border border-red-300 text-sm mb-4 bg-red-50 p-3 rounded">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-700 border border-green-300 text-sm mb-4 bg-green-50 p-3 rounded">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              label="Course Code"
              type="text"
              name="courseCode"
              value={formData.courseCode}
              onChange={handleChange}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter the unique course code provided by your lecturer.
            </p>
          </div>

          <div>
            <Input
              label="Enrollment Key"
              type="text"
              name="enrollmentKey"
              value={formData.enrollmentKey}
              onChange={handleChange}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Type the enrollment key exactly as given. It may be
              case-sensitive.
            </p>
          </div>

          <button
            type="submit"
            className="w-full font-medium bg-indigo-600 text-white py-2.5 rounded-md hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
          >
            {" "}
            <IoIosCheckmark className="mr-2 inline text-3xl -mt-1" /> Enroll in
            Course{" "}
          </button>
        </form>
      </Card>

      {/* How to Enroll */}
      <Card className="w-full max-w-md p-6 sm:p-8 bg-white rounded-xl shadow-sm space-y-6">
        <h2 className="font-semibold text-lg">How to Enroll</h2>

        {[
          {
            title: "Get Course Details",
            text: "Your lecturer will provide you with a unique course code and an enrollment key.",
          },
          {
            title: "Enter Information",
            text: "Fill in the course code and enrollment key in the form above.",
          },
          {
            title: "Confirm Enrollment",
            text: "Click enroll and the course will appear in your dashboard if successful.",
          },
        ].map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="w-7 h-7 flex items-center justify-center bg-indigo-600 text-white text-sm font-medium rounded-full shrink-0">
              {index + 1}
            </div>
            <div>
              <h3 className="font-medium">{step.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{step.text}</p>
            </div>
          </div>
        ))}
      </Card>

      {/* Help Section */}
      <Card className="w-full max-w-md p-6 sm:p-8 bg-white rounded-xl shadow-sm space-y-6">
        <h2 className="font-semibold text-lg">Need Help?</h2>

        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-medium">Can't find the enrollment key?</h3>
            <p className="text-gray-600 mt-1">
              Contact your lecturer or check your course materials.
            </p>
          </div>

          <div>
            <h3 className="font-medium">Enrollment key not working?</h3>
            <p className="text-gray-600 mt-1">
              Double-check both fields. They are case-sensitive.
            </p>
          </div>

          <div>
            <h3 className="font-medium">Still having issues?</h3>
            <p className="text-gray-600 mt-1">
              Contact IT support or your lecturer for further assistance.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default EnrollCourse;
