import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { markAttendance } from '../api/Student';

function ScanQR() {
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const qrRef = useRef(null);
    const html5QrCode = useRef(null);

    useEffect(() => {
        if (!html5QrCode.current) {
            html5QrCode.current = new Html5Qrcode('qr-reader');
            const config = { fps: 10, qrbox: { width: 250, height: 250 } };
            html5QrCode.current
                .start({ facingMode: 'environment' }, config, handleScan)
                .catch((err) => setError('Failed to start QR scanner. Allow camera access.'));
        }

        return () => {
            if (html5QrCode.current && html5QrCode.current.isScanning) {
                html5QrCode.current.stop().catch((err) => console.error('Failed to stop scanner', err));
            }
        };
    }, []);

    const handleScan = async (decodedText) => {
        try {
            const url = new URL(decodedText);
            const sessionId = url.searchParams.get('sessionId');
            const courseId = url.searchParams.get('courseId');
            if (!sessionId || !courseId) {
                throw new Error('Invalid QR code');
            }
            const response = await markAttendance(sessionId, courseId);
            setSuccess(response.message || 'Attendance marked successfully!');
            setResult(decodedText);
            html5QrCode.current.stop();
        } catch (err) {
            setError('Failed to mark attendance. Try again.');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Scan QR Code</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <div className="flex flex-col items-center">
                <div id="qr-reader" ref={qrRef} className="w-full max-w-sm mb-4"></div>
                {result && (
                    <p className="text-sm text-gray-600 break-all">Scanned: {result}</p>
                )}
            </div>
        </div>
    );
}

export default ScanQR;