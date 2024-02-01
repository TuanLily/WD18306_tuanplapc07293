import Post from './base.js';

export class ListPost extends Post {
    constructor(baseUrl, endpoint) {
        super(baseUrl, endpoint);
    }

    async getAllListPosts() {
        try {
            return await this.get(`${this.endpoint}`);
        } catch (error) {
            console.error('Error getting comments:', error);
            throw error;
        }
    }

    async getOnePosts(postID) {
        try {
            return await this.get(`${this.endpoint}/${postID}`);
        } catch (error) {
            console.error(`Error getting post with ID ${postID}:`, error);
            throw error;
        }
    }
}

