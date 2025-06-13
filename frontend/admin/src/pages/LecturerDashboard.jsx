import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCourses } from '../api/Lecturer';

function LecturerDashboard() {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getCourses();
                setCourses(data);
            } catch (err) {
                setError('Failed to load courses');
            }
        };
        fetchCourses();
    }, []);

    const handleGenerateQR = (courseId) => {
        window.open(`/courses/${courseId}/qr`, '_blank');
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Lecturer Dashboard</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <Link
                to="/courses/create"
                className="bg-blue-600 text-white px-4 py-2 rounded-md mb-6 inline-block hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
                Create Course
            </Link>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <div
                        key={course._id}
                        className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">{course.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">Code: {course.code}</p>
                        <p className="text-sm text-gray-600 mb-2">Year: {course.year}</p>
                        <p className="text-sm text-gray-600 mb-4">Department: {course.department?.name || 'N/A'}</p>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => handleGenerateQR(course._id)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            >
                                Generate QR
                            </button>
                            <Link
                                to={`/courses/${course._id}/enrollment`}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            >
                                Set Enrollment Key
                            </Link>
                            <Link
                                to={`/courses/${course._id}/attendance`}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            >
                                View Attendance
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LecturerDashboard;