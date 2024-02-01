import Comment from './base.js';

export class ListComment extends Comment {
    constructor(baseUrl, endpoint) {
        super(baseUrl, endpoint);
    }

    async getAllListComments() {
        try {
            return await this.get(`${this.endpoint}`);
        } catch (error) {
            console.error('Error getting comments:', error);
            throw error;
        }
    }

    async getOneComment(comemntID) {
        try {
            return await this.get(`${this.endpoint}/${comemntID}`);
        } catch (error) {
            console.error(`Error getting post with ID ${comemntID}:`, error);
            throw error;
        }
    }
}

