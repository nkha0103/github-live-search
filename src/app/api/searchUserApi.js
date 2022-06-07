import axiosClient from "./axiosClient";

const searchUserApi = {
    getUsers: (searchInput, limit, config = {}) => {
        const query = encodeURIComponent(searchInput)
        return axiosClient.get(`/search/users?q=${query}&per_page=${limit}`, config);
    }
};

export default searchUserApi;