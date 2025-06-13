import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import QRCode from 'qrcode.react';

function GenerateQR() {
    const { courseId } = useParams();
    const [qrUrl, setQrUrl] = useState('');
    const [course, setCourse] = useState(null);
    const [error, setError] = useState('');
    const currentDateTime = new Date().toLocaleString();

    useEffect(() => {
        const fetchQRAndCourse = async () => {
            try {
                // Generate QR code
                const qrResponse = await axios.post(
                    'https://attendance-monitoring-system-ct6t.onrender.com/api/lecturer/qr-code',
                    { courseId },
                    { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
                );
                setQrUrl(qrResponse.data.qrUrl);

                // Fetch course details
                const courseResponse = await axios.get(
                    'https://attendance-monitoring-system-ct6t.onrender.com/api/lecturer/courses',
                    { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
                );
                const courseData = courseResponse.data.find(c => c._id === courseId);
                setCourse(courseData);
            } catch (err) {
                setError('Failed to generate QR code or fetch course details');
                console.error(err);
            }
        };
        fetchQRAndCourse();
    }, [courseId]);

    return (
        <div className="container mx-auto p-6 flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">QR Code for Attendance</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {course ? (
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 max-w-md w-full">
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">{course.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">Course Code: {course.code}</p>
                    <p className="text-sm text-gray-600 mb-4">Date & Time: {currentDateTime}</p>
                    <div className="flex justify-center mb-4">
                        {qrUrl ? (
                            <QRCode value={qrUrl} size={256} />
                        ) : (
                            <p className="text-gray-600">Generating QR code...</p>
                        )}
                    </div>
                    <a
                        href={qrUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        Open QR Link
                    </a>
                </div>
            ) : (
                <p className="text-gray-600">Loading course details...</p>
            )}
        </div>
    );
}

export default GenerateQR;