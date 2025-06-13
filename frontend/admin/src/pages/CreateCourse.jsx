import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCourse } from '../api/Lecturer';
import { getDepartments } from '../api/Auth'; // Fixed import

function CreateCourse() {
    const [formData, setFormData] = useState({ name: '', code: '', year: '', department: '' });
    const [departments, setDepartments] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const data = await getDepartments();
                setDepartments(data);
                if (data.length > 0) {
                    setFormData((prev) => ({ ...prev, department: data[0]._id }));
                }
            } catch (err) {
                setError('Failed to load departments');
            }
        };
        fetchDepartments();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCourse({ ...formData, year: parseInt(formData.year) });
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to create course');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Create Course</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Code</label>
                    <input
                        type="text"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Year</label>
                    <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Department</label>
                    <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                    >
                        {departments.map((dept) => (
                            <option key={dept._id} value={dept._id}>
                                {dept.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                >
                    Create Course
                </button>
            </form>
        </div>
    );
}

export default CreateCourse;