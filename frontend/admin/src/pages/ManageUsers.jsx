import { useState, useEffect } from 'react';
import axios from 'axios';
import { register, getDepartments } from '../api/Auth.js';

function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        email: '',
        password: '',
        role: 'student',
        department: ''
    });
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('role');
    const [error, setError] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersRes, deptRes] = await Promise.all([
                    axios.get('https://attendance-monitoring-system-ct6t.onrender.com/api/admin/users', {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    }),
                    getDepartments()
                ]);
                setUsers(usersRes.data);
                setDepartments(deptRes);
                if (deptRes.length > 0) {
                    setFormData((prev) => ({ ...prev, department: deptRes[0]._id }));
                }
            } catch (err) {
                setError('Failed to load data');
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { user } = await register(formData);
            setUsers([...users, { ...user, ...formData, department: departments.find(d => d._id === formData.department) }]);
            setFormData({
                name: '',
                code: '',
                email: '',
                password: '',
                role: 'student',
                department: departments[0]?._id || ''
            });
        } catch (err) {
            setError('Failed to create user');
        }
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`https://attendance-monitoring-system-ct6t.onrender.com/api/admin/users/${userId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setUsers(users.filter(user => user._id !== userId));
            setDeleteConfirm(null);
        } catch (err) {
            setError('Failed to delete user');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const filteredUsers = users
        .filter(user => user.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === 'role') return a.role.localeCompare(b.role);
            return a.name.localeCompare(b.name);
        });

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
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
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="student">Student</option>
                            <option value="lecturer">Lecturer</option>
                            <option value="admin">Admin</option>
                        </select>
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
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                >
                    Add User
                </button>
            </form>
            <div className="mb-4 flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 border rounded-md"
                />
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2 border rounded-md"
                >
                    <option value="name">Sort by Name</option>
                    <option value="role">Sort by Role</option>
                </select>
            </div>
            <h3 className="text-xl font-semibold mb-4">Users</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Code</th>
                            <th className="p-2 border">Email</th>
                            <th className="p-2 border">Role</th>
                            <th className="p-2 border">Department</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user._id}>
                                <td className="p-2 border">{user.name}</td>
                                <td className="p-2 border">{user.code}</td>
                                <td className="p-2 border">{user.email}</td>
                                <td className="p-2 border">{user.role}</td>
                                <td className="p-2 border">{user.department?.name || 'N/A'}</td>
                                <td className="p-2 border">
                                    <button
                                        onClick={() => setDeleteConfirm(user._id)}
                                        className="bg-red-600 text-white p-1 rounded hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg">
                        <p className="mb-4">Are you sure you want to delete this user?</p>
                        <button
                            onClick={() => handleDelete(deleteConfirm)}
                            className="bg-red-600 text-white p-2 rounded mr-2"
                        >
                            Yes
                        </button>
                        <button
                            onClick={() => setDeleteConfirm(null)}
                            className="bg-gray-600 text-white p-2 rounded"
                        >
                            No
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageUsers;