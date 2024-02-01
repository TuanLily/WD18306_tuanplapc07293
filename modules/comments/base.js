import {APICaller} from '../../Base/APICaller.js';

class Comment extends APICaller {
    constructor(baseUrl) {
        super(baseUrl);
        this.endpoint = 'comments';
    }
}

export default Comment;