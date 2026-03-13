import { useState, useEffect } from "react";
import api from "../api/apiConfig";
import Layout from "../components/Layout";
import { getDepartments } from "../api/Auth";
import {
  FiSearch,
  FiPlus,
  FiTrash2,
  FiFilter,
  FiAlertCircle,
  FiUsers,
} from "react-icons/fi";

function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    year: "",
    department: "",
    lecturer: "",
  });
  const [assignData, setAssignData] = useState({
    courseId: "",
    lecturerId: "",
  });
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("year");
  const [error, setError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, deptRes, usersRes] = await Promise.all([
          api.get("/admin/courses"),
          getDepartments(),
          api.get("/admin/users"),
        ]);
        setCourses(coursesRes.data);
        setDepartments(deptRes);
        setLecturers(usersRes.data.filter((user) => user.role === "lecturer"));
        if (deptRes.length > 0) {
          setFormData((prev) => ({ ...prev, department: deptRes[0]._id }));
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/admin/courses", {
        ...formData,
        year: parseInt(formData.year),
      });
      setCourses([...courses, response.data]);
      setFormData({
        name: "",
        code: "",
        year: "",
        department: departments[0]?._id || "",
        lecturer: "",
      });
      setError("");
    } catch (err) {
      setError("Failed to create course");
      console.error(err);
    }
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    try {
      const response = await api.patch(
        `/admin/courses/${assignData.courseId}/assign`,
        { lecturerId: assignData.lecturerId },
      );
      setCourses(
        courses.map((c) => (c._id === assignData.courseId ? response.data : c)),
      );
      setAssignData({ courseId: "", lecturerId: "" });
      setError("");
    } catch (err) {
      setError("Failed to assign lecturer");
    }
  };

  const handleDelete = async (courseId) => {
    try {
      await api.delete(`/admin/courses/${courseId}`);
      setCourses(courses.filter((course) => course._id !== courseId));
      setDeleteConfirm(null);
      setError("");
    } catch (err) {
      setError("Failed to delete course");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAssignChange = (e) => {
    setAssignData({ ...assignData, [e.target.name]: e.target.value });
  };

  const filteredCourses = courses
    .filter((course) =>
      course.name.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "year") return a.year - b.year;
      if (sortBy === "department")
        return (a.department?.name || "").localeCompare(
          b.department?.name || "",
        );
      return a.name.localeCompare(b.name);
    });

  return (
    <Layout title="Manage Courses" subtitle="Add and manage courses">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
          <FiAlertCircle size={20} />
          {error}
        </div>
      )}

      {/* Create Course Form */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <FiPlus size={20} className="text-indigo-600" />
          Create New Course
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Course Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="e.g., Introduction to Programming"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Course Code
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="e.g., CS101"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Year
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                min="1"
                max="4"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
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
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Lecturer (Optional)
              </label>
              <select
                name="lecturer"
                value={formData.lecturer}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
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
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            <FiPlus size={18} />
            Create Course
          </button>
        </form>
      </div>

      {/* Assign Lecturer Form */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <FiUsers size={20} className="text-green-600" />
          Assign Lecturer to Course
        </h2>
        <form onSubmit={handleAssign}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Course
              </label>
              <select
                name="courseId"
                value={assignData.courseId}
                onChange={handleAssignChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                required
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.name} ({course.code})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Lecturer
              </label>
              <select
                name="lecturerId"
                value={assignData.lecturerId}
                onChange={handleAssignChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
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
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <FiUsers size={18} />
            Assign Lecturer
          </button>
        </form>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <FiFilter size={20} className="text-indigo-600" />
            Courses ({filteredCourses.length})
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch
                size={18}
                className="absolute left-3 top-3 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search by course name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="year">Sort by Year</option>
              <option value="department">Sort by Department</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8 text-slate-500">Loading...</div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            No courses found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                    Course Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                    Code
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                    Year
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                    Department
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                    Lecturer
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredCourses.map((course) => (
                  <tr
                    key={course._id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-slate-900">
                      {course.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {course.code}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      Year {course.year}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {course.department?.name || "—"}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {course.lecturer ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                          {course.lecturer.name}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">
                          Unassigned
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setDeleteConfirm(course._id)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                      >
                        <FiTrash2 size={16} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Delete Course?
            </h3>
            <p className="text-slate-600 mb-6">
              Are you sure you want to delete this course? This action cannot be
              undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 bg-slate-200 text-slate-900 py-2 rounded-lg hover:bg-slate-300 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default ManageCourses;
