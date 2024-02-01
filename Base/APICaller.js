import axios from 'axios';
export const API_URL = 'http://localhost:3201/';

export class APICaller {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async get(endpoint) {
        try {
            const response = await axios.get(`${this.baseUrl}${endpoint}`);
            const data = response.data;
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

}

