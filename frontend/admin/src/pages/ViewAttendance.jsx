import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAttendance } from '../api/Lecturer';

function ViewAttendance() {
    const { courseId } = useParams();
    const [attendance, setAttendance] = useState([]);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [filterPercentage, setFilterPercentage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const data = await getAttendance(courseId);
                setAttendance(data);
            } catch (err) {
                setError('Failed to load attendance');
            }
        };
        fetchAttendance();
    }, [courseId]);

    const filteredAttendance = attendance
        .filter((att) => att.name.toLowerCase().includes(search.toLowerCase()))
        .filter((att) => (filterPercentage ? att.percentage >= parseFloat(filterPercentage) : true))
        .sort((a, b) => {
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            if (sortBy === 'percentage') return b.percentage - a.percentage;
            return 0;
        });

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">View Attendance</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
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
                    <option value="percentage">Sort by Percentage</option>
                </select>
                <input
                    type="number"
                    placeholder="Min Percentage"
                    value={filterPercentage}
                    onChange={(e) => setFilterPercentage(e.target.value)}
                    className="p-2 border rounded-md"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Sessions Attended</th>
                            <th className="p-2 border">Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAttendance.map((att) => (
                            <tr key={att.name}>
                                <td className="p-2 border">{att.name}</td>
                                <td className="p-2 border">{att.sessions.length}</td>
                                <td className="p-2 border">{att.percentage.toFixed(2)}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewAttendance;