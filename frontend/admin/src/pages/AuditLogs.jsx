import { useState, useEffect } from 'react';
import axios from 'axios';

function AuditLogs() {
    const [logs, setLogs] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get('https://attendance-monitoring-system-ct6t.onrender.com/api/admin/audit-logs', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setLogs(response.data);
            } catch (err) {
                setError('Failed to load audit logs');
            }
        };
        fetchLogs();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Audit Logs</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="p-2 border">User</th>
                            <th className="p-2 border">Action</th>
                            <th className="p-2 border">Details</th>
                            <th className="p-2 border">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log) => (
                            <tr key={log._id}>
                                <td className="p-2 border">{log.user?.name || 'N/A'}</td>
                                <td className="p-2 border">{log.action}</td>
                                <td className="p-2 border">{log.details || 'N/A'}</td>
                                <td className="p-2 border">{new Date(log.timestamp).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AuditLogs;