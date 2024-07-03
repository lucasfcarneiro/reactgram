import { json } from 'react-router-dom';
import { api, requestConfig } from '../utils/config';

//Register an user
const register = async (data) => {
    const config = requestConfig("POST", data);

    try {
        const response = await fetch(api + "/users/register", config)
            .then((response) => response.json())
            .catch((err) => err)

        if (response._id) {
            localStorage.setItem("user", JSON.stringify(response));
        }
        return response;

    } catch (error) {
        console.log(error)
    }
};

//Logout an user by removing the token 
const logout = () => {
    localStorage.removeItem("user")
};

//Sign in an user
async function login(data) { 
    const config = requestConfig("Post", data);

    try {
        const response = await fetch(api + "/users/login", config)
            .then((response) => response.json())
            .catch((err) => err);

        if (response._id) {
            localStorage.setItem("user", JSON.stringify(response));
        }
        return response;
    } catch (error) {
        console.log(error);
    }
}


const authService = {
    register,
    logout,
    login,
};

export default authService;
