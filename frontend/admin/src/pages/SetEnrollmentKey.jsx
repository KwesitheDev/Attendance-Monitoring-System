import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { setEnrollmentKey } from '../api/Lecturer';

function SetEnrollmentKey() {
    const { courseId } = useParams();
    const [enrollmentKey, setEnrollmentKey] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await setEnrollmentKey(courseId, enrollmentKey);
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to set enrollment key');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Set Enrollment Key</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <div>
                    <label className="block text-sm font-medium">Enrollment Key</label>
                    <input
                        type="text"
                        value={enrollmentKey}
                        onChange={(e) => setEnrollmentKey(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                >
                    Set Key
                </button>
            </form>
        </div>
    );
}

export default SetEnrollmentKey;