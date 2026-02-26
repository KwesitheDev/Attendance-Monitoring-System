import api from "./apiConfig";

export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);

    const safeUser = {
      id: response.data.user.id,
      email: response.data.user.email,
      name: response.data.user.name,
      role: response.data.user.role,
      department: response.data.user.department,
    };

    localStorage.setItem("user", JSON.stringify(safeUser));
  }
  return response.data;
};

export const getUser = async () => {
  const response = await api.get("/auth/user");
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const getDepartments = async () => {
  const response = await api.get("/auth/departments");
  return response.data;
};
