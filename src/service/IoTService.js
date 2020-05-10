import axios from 'axios'

const USER_BASE_URL = `http://localhost:8080/user`;

const IOT_BASE_URL = `http://localhost:8080/smart_device`;

export function getAllMachines() {
    return axios.get(IOT_BASE_URL).then(res => res.data);
}

export function updateMachine(id, data) {
    return axios.post(`${IOT_BASE_URL}/${id}/update`, data).then(res => res.data);
}

export function addUserHealth(id, health) {
    return axios.post(`${USER_BASE_URL}/health/${id}`, health).then(res => res.data);
}
export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}