import { useState, useEffect } from 'react';
import axios from 'axios';
import { getDepartments } from '../api/Auth';

function ManageCourses() {
    const [courses, setCourses] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [lecturers, setLecturers] = useState([]);
    const [formData, setFormData] = useState({ name: '', code: '', year: '', department: '', lecturer: '' });
    const [assignData, setAssignData] = useState({ courseId: '', lecturerId: '' });
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('year');
    const [error, setError] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [coursesRes, deptRes, usersRes] = await Promise.all([
                    axios.get('https://attendance-monitoring-system-ct6t.onrender.com/api/admin/courses', {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    }),
                    getDepartments(),
                    axios.get('https://attendance-monitoring-system-ct6t.onrender.com/api/admin/users', {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    })
                ]);
                setCourses(coursesRes.data);
                setDepartments(deptRes);
                setLecturers(usersRes.data.filter(user => user.role === 'lecturer'));
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
            const response = await axios.post(
                'https://attendance-monitoring-system-ct6t.onrender.com/api/admin/courses',
                { ...formData, year: parseInt(formData.year) },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            setCourses([...courses, response.data]);
            setFormData({ name: '', code: '', year: '', department: departments[0]?._id || '', lecturer: '' });
            setError('');
        } catch (err) {
            setError('Failed to create course');
            console.error(err);
        }
    };

    const handleAssign = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(
                `https://attendance-monitoring-system-ct6t.onrender.com/api/admin/courses/${assignData.courseId}/assign`,
                { lecturerId: assignData.lecturerId },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            setCourses(courses.map(c => c._id === assignData.courseId ? response.data : c));
            setAssignData({ courseId: '', lecturerId: '' });
            setError('');
        } catch (err) {
            setError('Failed to assign lecturer');
        }
    };

    const handleDelete = async (courseId) => {
        try {
            await axios.delete(`https://attendance-monitoring-system-ct6t.onrender.com/api/admin/courses/${courseId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setCourses(courses.filter(course => course._id !== courseId));
            setDeleteConfirm(null);
            setError('');
        } catch (err) {
            setError('Failed to delete course');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAssignChange = (e) => {
        setAssignData({ ...assignData, [e.target.name]: e.target.value });
    };

    const filteredCourses = courses
        .filter(course => course.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === 'year') return a.year - b.year;
            if (sortBy === 'department') return a.department?.name.localeCompare(b.department?.name || '');
            return a.name.localeCompare(b.name);
        });

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Manage Courses</h2>
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
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Department</label>
                        <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        >
                            <option value="">Select Department</option>
                            {departments.map((dept) => (
                                <option key={dept._id} value={dept._id}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Lecturer (Optional)</label>
                        <select
                            name="lecturer"
                            value={formData.lecturer}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="">No Lecturer</option>
                            {lecturers.map((lecturer) => (
                                <option key={lecturer._id} value={lecturer._id}>
                                    {lecturer.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                    Add Course
                </button>
            </form>
            <form onSubmit={handleAssign} className="space-y-4 mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium">Course</label>
                        <select
                            name="courseId"
                            value={assignData.courseId}
                            onChange={handleAssignChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        >
                            <option value="">Select Course</option>
                            {courses.map((course) => (
                                <option key={course._id} value={course._id}>
                                    {course.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Lecturer</label>
                        <select
                            name="lecturerId"
                            value={assignData.lecturerId}
                            onChange={handleAssignChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        >
                            <option value="">Select Lecturer</option>
                            {lecturers.map((lecturer) => (
                                <option key={lecturer._id} value={lecturer._id}>
                                    {lecturer.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                    Assign Lecturer
                </button>
            </form>
            <div className="mb-4 flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                    <option value="name">Sort by Name</option>
                    <option value="year">Sort by Year</option>
                    <option value="department">Sort by Department</option>
                </select>
            </div>
            <h3 className="text-xl font-semibold mb-4">Courses</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Code</th>
                            <th className="p-2 border">Year</th>
                            <th className="p-2 border">Department</th>
                            <th className="p-2 border">Lecturer</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCourses.map((course) => (
                            <tr key={course._id}>
                                <td className="p-2 border">{course.name}</td>
                                <td className="p-2 border">{course.code}</td>
                                <td className="p-2 border">{course.year}</td>
                                <td className="p-2 border">{course.department?.name || 'N/A'}</td>
                                <td className="p-2 border">{course.lecturer?.name || 'Unassigned'}</td>
                                <td className="p-2 border">
                                    <button
                                        onClick={() => setDeleteConfirm(course._id)}
                                        className="bg-red-600 text-white p-1 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
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
                        <p className="mb-4">Are you sure you want to delete this course?</p>
                        <button
                            onClick={() => handleDelete(deleteConfirm)}
                            className="bg-red-600 text-white p-2 rounded mr-2 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                        >
                            Yes
                        </button>
                        <button
                            onClick={() => setDeleteConfirm(null)}
                            className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        >
                            No
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageCourses;