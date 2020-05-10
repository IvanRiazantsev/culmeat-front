import axios from 'axios'

const AUTH_BASE_URL = `http://localhost:8080/auth`;

export function signIn(requestModel) {
    return axios.post(`${AUTH_BASE_URL}/signin`, {
        username: requestModel.username,
        password: requestModel.password,
    }).then(res => res.data);
}

export function signUp(requestModel) {
    return axios.post(`${AUTH_BASE_URL}/signup`, {
        username: requestModel.username,
        password: requestModel.password,
        firstName: requestModel.firstName,
        lastName: requestModel.lastName
    }).then(res => res.data);
}
