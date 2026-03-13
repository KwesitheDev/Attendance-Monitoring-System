import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/apiConfig";
import QRCode from "qrcode.react";
import { LuQrCode } from "react-icons/lu";

function GenerateQR() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [qrUrl, setQrUrl] = useState("");
  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [recentScans, setRecentScans] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch course details
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const res = await api.get(`/lecturer/courses/${courseId}`);

        setCourse(res.data);
      } catch (err) {
        setError("Failed to fetch course");
        console.error(err);
      }
    };

    if (courseId) fetchCourseDetails();
  }, [courseId]);

  // Start session
  const startSession = async () => {
    setLoading(true);

    try {
      const res = await axios.post(
        "https://attendance-monitoring-system-ct6t.onrender.com/api/lecturer/qr-code",
        { courseId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setQrUrl(res.data.qrUrl);
      setSessionActive(true);
      setSessionStartTime(new Date());
      setError("");
    } catch (err) {
      setError("Failed to start session");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // End session
  const endSession = async () => {
    setLoading(true);

    try {
      await axios.post(
        "https://attendance-monitoring-system-ct6t.onrender.com/api/lecturer/end-session",
        { courseId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setSessionActive(false);
      setQrUrl("");
    } catch (err) {
      setError("Failed to end session");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Poll recent scans
  useEffect(() => {
    let interval;

    if (sessionActive) {
      interval = setInterval(async () => {
        try {
          const res = await axios.get(
            `https://attendance-monitoring-system-ct6t.onrender.com/api/lecturer/recent-scans/${courseId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          );

          setRecentScans(res.data);
        } catch (err) {
          console.error("Scan fetch error", err);
        }
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [sessionActive, courseId]);

  // Format time
  const formatTime = (date) =>
    date
      ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "";

  // Format date
  const formatDate = (date) =>
    date
      ? date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "";

  // Download QR
  const downloadQRCode = () => {
    const canvas = document
      .getElementById("qr-code-wrapper")
      ?.querySelector("canvas");

    if (!canvas) return;

    const pngUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = `attendance-qr-${courseId}.png`;
    link.click();
  };

  return (
    <div className="container mx-auto p-6">
      {/* HEADER */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
        >
          ←
        </button>

        <h1 className="text-2xl font-bold text-gray-800">Lecturer Panel</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* COURSE DETAILS */}
        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="text-lg font-semibold mb-4">Course Details</h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Course Code</p>
              <p className="font-semibold">{course?.code || "Loading..."}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Course Name</p>
              <p className="font-semibold">{course?.name || "Loading..."}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Department</p>
              <p className="font-semibold">{course?.department || "-"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Students</p>
              <p className="font-semibold">{course?.students?.length || 0}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Session Status</p>

              <span
                className={`px-2 py-1 rounded text-sm ${
                  sessionActive
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {sessionActive ? "Session Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>

        {/* QR SECTION */}
        <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow border">
          <h2 className="text-xl font-semibold mb-6">Attendance QR Code</h2>

          {!sessionActive ? (
            <div className="flex flex-col items-center justify-center h-[420px] bg-gray-50 rounded-lg border border-dashed">
              <LuQrCode size={70} className="text-gray-400 mb-4" />

              <p className="text-lg font-medium text-gray-700">
                No Active Session
              </p>

              <p className="text-gray-500 mb-6">
                Start a session to generate QR code
              </p>

              <button
                onClick={startSession}
                disabled={loading}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
              >
                {loading ? "Starting..." : "Start Session"}
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div
                id="qr-code-wrapper"
                className="p-6 bg-gray-50 rounded-lg border mb-6"
              >
                <QRCode value={qrUrl} size={260} level="H" includeMargin />
              </div>

              <div className="flex gap-10 mb-6 text-center">
                <div>
                  <p className="text-xs text-gray-500">Session Time</p>
                  <p className="font-semibold">
                    {formatTime(sessionStartTime)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Session Date</p>
                  <p className="font-semibold">
                    {formatDate(sessionStartTime)}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 w-full max-w-md">
                <button
                  onClick={downloadQRCode}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  Download
                </button>

                <button
                  onClick={endSession}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                >
                  End Session
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RECENT SCANS */}
      {sessionActive && (
        <div className="mt-6 bg-white p-6 rounded-xl shadow border">
          <h2 className="text-lg font-semibold mb-4">Recent Scans</h2>

          {recentScans.length === 0 ? (
            <p className="text-gray-500">No scans yet</p>
          ) : (
            <div className="space-y-3">
              {recentScans.map((scan, i) => (
                <div
                  key={i}
                  className="flex items-center p-3 bg-gray-50 rounded"
                >
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                    {scan.studentName.charAt(0)}
                  </div>

                  <div className="flex-1">
                    <p className="font-medium">{scan.studentName}</p>
                    <p className="text-sm text-gray-500">{scan.timeAgo}</p>
                  </div>

                  <span className="text-green-600 text-sm font-medium">
                    {scan.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}
    </div>
  );
}

export default GenerateQR;
