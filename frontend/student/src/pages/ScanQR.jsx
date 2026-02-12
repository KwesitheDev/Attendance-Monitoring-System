import { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { markAttendance } from "../api/Student";
import Card from "../components/Card";
import { LuScanLine, LuCamera, LuX } from "react-icons/lu";

function ScanQR() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const html5QrCode = useRef(null);

  // Handle successful scan
  const handleScan = async (decodedText) => {
    try {
      const url = new URL(decodedText);
      const sessionId = url.searchParams.get("sessionId");
      const courseId = url.searchParams.get("courseId");

      if (!sessionId || !courseId) {
        throw new Error("Invalid QR code");
      }

      const response = await markAttendance(sessionId, courseId);
      setSuccess(response.message || "Attendance marked successfully!");
      setResult(decodedText);

      await stopScan();
    } catch (err) {
      setError("Failed to mark attendance. Try again.");
    }
  };

  // Start scanning (trigger render first)
  const startScan = () => {
    setError("");
    setSuccess("");
    setResult("");
    setScanning(true);
  };

  // Stop scanning safely
  const stopScan = async () => {
    if (html5QrCode.current?.isScanning) {
      await html5QrCode.current.stop();
    }
    setScanning(false);
  };

  // Start camera AFTER qr-reader is in the DOM
  useEffect(() => {
    if (!scanning) return;

    const startCamera = async () => {
      try {
        if (!html5QrCode.current) {
          html5QrCode.current = new Html5Qrcode("qr-reader");
        }

        await html5QrCode.current.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          handleScan,
        );
      } catch (err) {
        setError("Failed to start QR scanner. Allow camera access.");
        setScanning(false);
      }
    };

    startCamera();

    return () => {
      if (html5QrCode.current?.isScanning) {
        html5QrCode.current.stop().catch(() => {});
      }
    };
  }, [scanning]);

  return (
    <div className="mx-auto p-6">
      <h1 className="text-2xl font-bold mt-6 mb-2 text-center ">
        Scan QR Code
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        Scan the QR code displayed by your lecturer to mark attendance
      </p>

      <Card className="max-w-md mx-auto">
        <div className="flex flex-col items-center text-center gap-4">
          {!scanning && (
            <>
              <div className="bg-violet-50 p-5 rounded-full">
                <LuScanLine className="w-20 h-20 text-indigo-500" />
              </div>

              <h2 className="font-semibold text-lg">Ready to Scan</h2>
              <p className="text-sm text-gray-600">
                Position the QR code within the camera frame
              </p>

              <button
                onClick={startScan}
                className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
              >
                <LuCamera className="w-5 h-5" />
                Scan QR Code
              </button>
            </>
          )}

          {scanning && (
            <>
              <div
                id="qr-reader"
                className="w-full max-w-sm rounded-lg overflow-hidden"
              />

              <button
                onClick={stopScan}
                className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                <LuX className="w-4 h-4" />
                Cancel Scan
              </button>
            </>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}
        </div>
      </Card>
    </div>
  );
}

export default ScanQR;
