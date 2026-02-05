import axios from "axios";

const API_URL = "https://attendance-monitoring-system-ct6t.onrender.com/api";

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);

    const safeUser = {
      id: response.data.user.id,
      email: response.data.user.email,
      name: response.data.user.name,
      role: response.data.user.role,
    };

    localStorage.setItem("user", JSON.stringify(safeUser));
  }

  return response.data;
};

export const enrollCourse = async (courseCode, enrollmentKey) => {
  const response = await axios.post(
    `${API_URL}/student/enroll`,
    { courseCode, enrollmentKey },
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
  );
  return response.data;
};

export const markAttendance = async (sessionId, courseId) => {
  const response = await axios.post(
    `${API_URL}/student/attendance`,
    { sessionId, courseId },
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
  );
  return response.data;
};

export const getCourses = async () => {
  const response = await axios.get(`${API_URL}/student/courses`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};
