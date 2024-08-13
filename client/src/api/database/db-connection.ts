import axios from 'axios';
const baseURL = 'http://localhost:8080';

export const fetch = axios.create({
    baseURL: baseURL
})