import axios from "axios";

const API_URL = process.env.REACT_APP_BE_URL;

const register = (firstName, lastName, email, password) => {
    return axios.post(API_URL + "/user/signup", {
        fname: firstName,
        lname: lastName,
        email,
        password,
    });
};

const login = (email, password) => {
    return axios
        .post(API_URL + "/user/login", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const authService = {
    register,
    login,
    logout,
};

export default authService;