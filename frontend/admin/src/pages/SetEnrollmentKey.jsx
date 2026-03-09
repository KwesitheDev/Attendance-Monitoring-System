import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { setEnrollmentKey } from "../api/Lecturer";
import Card from "../components/Card";
import { LuArrowLeft, LuKey } from "react-icons/lu";

function SetEnrollmentKey() {
  const { courseId } = useParams();
  const [enrollmentKey, setEnrollmentKeyState] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setEnrollmentKey(courseId, enrollmentKey);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to set enrollment key");
    }
  };

  const handleGenerateKey = () => {
    const randomKey = Math.random().toString(36).substring(2, 10).toUpperCase();
    setEnrollmentKeyState(randomKey);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-black"
      >
        <LuArrowLeft size={18} />
        Back
      </button>

      {/* Enrollment Key Card */}
      <Card>
        <div className="flex items-center gap-2 mb-6">
          <LuKey className="" size={20} />
          <h2 className="text-lg font-semibold">Enrollment Key</h2>
        </div>

        {error && (
          <div className="mb-4 text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-2">
              Current Enrollment Key
            </label>

            <input
              type="text"
              value={enrollmentKey}
              onChange={(e) => setEnrollmentKeyState(e.target.value)}
              placeholder="Enter enrollment key"
              className="
                w-full p-3 rounded-xl 
                bg-gray-100 
                border border-gray-200 
                focus:outline-none 
                focus:ring-2 
                focus:ring-violet-500
              "
              required
            />

            <p className="text-sm text-gray-500 mt-2">
              Students will need this key to enroll in your course
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={handleGenerateKey}
              className="
                flex-1 py-3 rounded-xl 
                border border-gray-300 
                hover:bg-gray-50
              "
            >
              Generate New Key
            </button>

            <button
              type="submit"
              className="
                flex-1 py-3 rounded-xl 
                bg-gradient-to-r from-violet-600 to-indigo-600 
                text-white 
                hover:opacity-90
              "
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* Guidelines */}
        <div className="border-t mt-6 pt-4">
          <h3 className="font-medium mb-2">Key Guidelines</h3>
          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
            <li>Keep the key secure and share only with enrolled students</li>
            <li>Change the key periodically for better security</li>
            <li>Use a memorable but unique combination</li>
          </ul>
        </div>
      </Card>

      {/* How Students Enroll */}
      <Card>
        <h3 className="text-lg font-semibold mb-6">How Students Enroll</h3>

        <div className="space-y-5">
          {[
            {
              title: "Navigate to Enroll Page",
              desc: 'Students go to their dashboard and click "Enroll in Course"',
            },
            {
              title: "Enter Course Code",
              desc: "They enter the course code",
            },
            {
              title: "Enter Enrollment Key",
              desc: "They enter the enrollment key you've set",
            },
            {
              title: "Confirm Enrollment",
              desc: "The course will be added to their dashboard",
            },
          ].map((step, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white text-sm font-medium">
                {index + 1}
              </div>
              <div>
                <p className="font-medium">{step.title}</p>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default SetEnrollmentKey;
