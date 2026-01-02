import API from "./api";

const register = async (userData) => {
    const response = await API.post("/users", userData);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const login = async (userData) => {
    const response = await API.post("/users/login", userData);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem("user");
};

const getProfile = async () => {
    const response = await API.get("/users/profile");
    return response.data;
};

const getUsers = async () => {
    const response = await API.get("/users");
    return response.data;
};

const deleteUser = async (id) => {
    const response = await API.delete(`/users/${id}`);
    return response.data;
};

const userService = {
    register,
    login,
    logout,
    getProfile,
    getUsers,
    deleteUser,
};

export default userService;
