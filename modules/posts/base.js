import {APICaller} from '../../Base/APICaller.js';

class Post extends APICaller {
    constructor(baseUrl) {
        super(baseUrl);
        this.endpoint = 'posts';
    }
}

export default Post;