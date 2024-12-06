import axios from "axios";

const BASE_URL = "https://api.github.com";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

export const searchUsers = async (userName, perPage = 100) => {
  try {
    const response = await axiosInstance.get("/search/users", {
      params: {
        q: userName,
        per_page: perPage,
      },
    });
    return response.data.items;
  } catch (error) {
    return { error: "Error fetching users" };
  }
};

export const getUserRepos = async (userName, perPage = 100) => {
  try {
    const response = await axiosInstance.get(`/users/${userName}/repos`, {
      params: {
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    return { error: "Error fetching user repositories" };
  }
};
