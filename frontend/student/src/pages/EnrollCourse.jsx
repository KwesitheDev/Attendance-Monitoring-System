import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { enrollCourse } from '../api/Student';

function EnrollCourse() {
    const [formData, setFormData] = useState({ courseCode: '', enrollmentKey: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await enrollCourse(formData.courseCode, formData.enrollmentKey);
            setSuccess('Successfully enrolled in course!');
            setFormData({ courseCode: '', enrollmentKey: '' });
            setTimeout(() => navigate('/dashboard'), 2000);
        } catch (err) {
            setError('Failed to enroll. Check course code or enrollment key.');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Enroll in Course</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Course Code</label>
                    <input
                        type="text"
                        name="courseCode"
                        value={formData.courseCode}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Enrollment Key</label>
                    <input
                        type="text"
                        name="enrollmentKey"
                        value={formData.enrollmentKey}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                    Enroll
                </button>
            </form>
        </div>
    );
}

export default EnrollCourse;