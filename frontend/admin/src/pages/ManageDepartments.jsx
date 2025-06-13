import { useState, useEffect } from 'react';
import axios from 'axios';
import { getDepartments } from '../api/Auth';

function ManageDepartments() {
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({ name: '', code: '' });
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const data = await getDepartments();
                setDepartments(data);
            } catch (err) {
                setError('Failed to load departments');
            }
        };
        fetchDepartments();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://attendance-monitoring-system-ct6t.onrender.com/api/admin/departments',
                formData,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            setDepartments([...departments, response.data]);
            setFormData({ name: '', code: '' });
        } catch (err) {
            setError('Failed to create department');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const filteredDepartments = departments.filter(dept =>
        dept.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Manage Departments</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                >
                    Add Department
                </button>
            </form>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 border rounded-md w-full sm:w-1/2"
                />
            </div>
            <h3 className="text-xl font-semibold mb-4">Departments</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDepartments.map((dept) => (
                            <tr key={dept._id}>
                                <td className="p-2 border">{dept.name}</td>
                                <td className="p-2 border">{dept.code}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManageDepartments;