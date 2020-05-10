import axios from 'axios'

const USER_BASE_URL = `http://localhost:8080/user`;

export function getUsers() {
    return axios.get(USER_BASE_URL).then(res => res.data);
}
export function getUser(id) {
    return axios.get(`${USER_BASE_URL}/${id}`).then(res => res.data);
}

export function updateUserAccessLevel(id, accessLevel) {
    return axios.post(`${USER_BASE_URL}/${id}/al_update`, {accessLevel}).then(res => res.data);
}

export function deleteUser(id) {
    return axios.delete(`${USER_BASE_URL}/${id}`).then(res => res.data);
}


export function getUserHealth(id) {
    return axios.get(`${USER_BASE_URL}/health/${id}`).then(res => res.data);
}

export function getUserHealthToday(id) {
    return axios.get(`${USER_BASE_URL}/health/${id}/today`).then(res => res.data)
}

export function getUnselectedDiseases(id) {
    return axios.get(`${USER_BASE_URL}/health/${id}/diseases_absent`).then(res => res.data);
}

export function deleteDisease(id, disease) {
    return axios.delete(`${USER_BASE_URL}/health/${id}/${disease}`).then(res => res.data);
}


export function addDisease(id, disease) {
    return axios.put(`${USER_BASE_URL}/health/${id}/${disease}`).then(res => res.data);
}

export function addUserHealth(id, health) {
    return axios.post(`${USER_BASE_URL}/health/${id}`, health).then(res => res.data);
}

export function getUserProductivity(id) {
    return axios.get(`${USER_BASE_URL}/productivity/${id}`).then(res => res.data);

}
