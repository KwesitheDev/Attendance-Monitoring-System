import { useState, useEffect } from "react";
import api from "../api/apiConfig";
import Layout from "../components/Layout";
import { getDepartments } from "../api/Auth";
import { FiSearch, FiPlus, FiAlertCircle, FiFilter } from "react-icons/fi";

function ManageDepartments() {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({ name: "", code: "" });
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getDepartments();
        setDepartments(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching departments:", err);
        setError("Failed to load departments");
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/admin/departments", formData);
      setDepartments([...departments, response.data]);
      setFormData({ name: "", code: "" });
      setError("");
    } catch (err) {
      setError("Failed to create department");
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Layout title="Manage Departments" subtitle="Create and manage departments">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
          <FiAlertCircle size={20} />
          {error}
        </div>
      )}

      {/* Create Department Form */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <FiPlus size={20} className="text-indigo-600" />
          Add New Department
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Department Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="e.g., Computer Science"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Department Code
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="e.g., CS"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            <FiPlus size={18} />
            Add Department
          </button>
        </form>
      </div>

      {/* Departments Table */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <FiFilter size={20} className="text-indigo-600" />
            Departments ({filteredDepartments.length})
          </h2>
          <div className="relative">
            <FiSearch
              size={18}
              className="absolute left-3 top-3 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by department name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8 text-slate-500">Loading...</div>
        ) : filteredDepartments.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            No departments found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                    Department Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                    Code
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredDepartments.map((dept) => (
                  <tr
                    key={dept._id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-slate-900">
                      {dept.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {dept.code}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default ManageDepartments;
