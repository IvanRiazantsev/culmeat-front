import axios from 'axios'

const PRODUCT_BASE_URL = `http://localhost:8080/product`;

export function getProducts() {
    return axios.get(PRODUCT_BASE_URL).then(res => res.data);
}
