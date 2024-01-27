
// ! Lab 5.1

/** 
 * * Trong JavaScript, từ khóa this thường được sử dụng để tham chiếu đến đối tượng hiện tại mà một hàm hoặc phương thức đang được gọi bên trong. Giá trị của this phụ thuộc vào cách hàm hoặc phương thức được gọi, và nó có thể thay đổi tùy vào cách mà mình khai báo ở trong Object.
 */

//Ví dụ

const sayHi = {
    name: 'Tính',
    Hello: function () {
        console.log(`Em xin chào thầy ${this.name}`);;
    }
}

sayHi.Hello();

// ! Lab 5.2
class Shape {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }
}

const newShape = new Shape(4, 5);
newShape.move(6, 7); // di chuyển shape đến vị trí mới x=6, y=7
console.log(newShape);


// ! Lab 5.3
// function Clock({ template }) {

//     let timer;

//     function render() {
//       let date = new Date();

//       let hours = date.getHours();
//       if (hours < 10) hours = '0' + hours;

//       let mins = date.getMinutes();
//       if (mins < 10) mins = '0' + mins;

//       let secs = date.getSeconds();
//       if (secs < 10) secs = '0' + secs;

//       let output = template
//         .replace('h', hours)
//         .replace('m', mins)
//         .replace('s', secs);

//       console.log(output);
//     }

//     this.stop = function() {
//       clearInterval(timer);
//     };

//     this.start = function() {
//       render();
//       timer = setInterval(render, 1000);
//     };

//   }

//   let clock = new Clock({template: 'h:m:s'});
//   clock.start();

class Clock {
    constructor({ template }) {
        this.template = template;
        this.timer = null;
    }

    render() {
        let date = new Date();

        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        let mins = date.getMinutes();
        if (mins < 10) mins = '0' + mins;

        let secs = date.getSeconds();
        if (secs < 10) secs = '0' + secs;

        let output = this.template
            .replace('h', hours)
            .replace('m', mins)
            .replace('s', secs);

        console.log(output);
    }

    stop() {
        clearInterval(this.timer);
    }

    start() {
        this.render();
        this.timer = setInterval(() => this.render(), 1000);
    }
}

let clock = new Clock({ template: 'h:m:s' });
// clock.start();

// ! Lab 5.4
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    set(_lastname) {
        this.lastName = _lastname;
    }

    get(_firstname) {
        this.firstName = _firstname;
    }
}

const person1 = new Person("Hào", "Huỳnh Trung");
const person2 = new Person("Tuấn", "Phan Lê Anh");

// In thông tin ban đầu
console.log("Person 1:", person1.firstName, person1.lastName);
console.log("Person 2:", person2.firstName, person2.lastName);

// Thực hiện set và get
person1.set("Cute");
person2.get("Lily");

// In thông tin sau khi thay đổi
console.log("Person 1 sau khi set:", person1.firstName, person1.lastName);
console.log("Person 2 sau khi get:", person2.firstName, person2.lastName);



// ! Lab 5.5
/**
 * Tạo ra lớp APICaller với constructor có 1 param là baseUrl
Một phương thức tên là get() để lấy dữ liệu, có thể sử dụng fetch hoặc axios để làm code base gọi api, phương thức này có 1 đối số đầu vào tên là “endpoint”
Tạo một lớp khác tên là Comment hoặc Post để lấy danh sách bình luận hoặc danh sách bài viết
Ở 2 lớp Comment hoặc Post tạo thêm 2 phương thức getAll và GetOne để lấy tất cả record hoặc một record.
Nộp 1 file duy nhất tên là app.js nếu dùng node để test (axios dùng npm)
Nộp 2 file html và script.js nếu dùng trình duyệt để test (axios dùng cdn)
 */

const axios = require("axios");
const API_URL = "http://localhost:3201/";


class APICaller {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async get(endpoint) {
        try {
            const response = await axios.get(`${this.baseUrl}${endpoint}`);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }

    async post(endpoint, data) {
        try {
            const response = await axios.post(`${this.baseUrl}${endpoint}`, data);
            return response.data;
        } catch (error) {
            console.error("Error posting data:", error);
            throw error;
        }
    }

    async put(endpoint, data) {
        try {
            const response = await axios.put(`${this.baseUrl}${endpoint}`, data);
            return response.data;
        } catch (error) {
            console.error("Error updating data:", error);
            throw error;
        }
    }

    async delete(endpoint) {
        try {
            const response = await axios.delete(`${this.baseUrl}${endpoint}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting data:", error);
            throw error;
        }
    }
}

//! Class Comments kế thừa apiCaller
class Comments extends APICaller {
    constructor(baseUrl) {
        super(baseUrl);
        this.endpoint = "comments";
    }

    async getAll() {
        try {
            return await this.get(`${this.endpoint}`);
        } catch (error) {
            console.error('Error getting comments:', error);
            throw error;
        }
    }

    async getOne(commentId) {
        try {
            return await this.get(`${this.endpoint}/${commentId}`);
        } catch (error) {
            console.error(`Error getting comment with ID ${commentId}:`, error);
            throw error;
        }
    }
    async addComment(data) {
        try {
            return await this.post(this.endpoint, data);
        } catch (error) {
            console.error('Error adding comment:', error);
            throw error;
        }
    }

    async updateComment(commentId, data) {
        try {
            return await this.put(`${this.endpoint}/${commentId}`, data);
        } catch (error) {
            console.error(`Error updating comment with ID ${commentId}:`, error);
            throw error;
        }
    }

    async deleteComment(commentId) {
        try {
            return await this.delete(`${this.endpoint}/${commentId}`);
        } catch (error) {
            console.error(`Error deleting comment with ID ${commentId}:`, error);
            throw error;
        }
    }
}
//! Class Posts kế thừa apiCaller

class Posts extends APICaller {
    constructor(baseUrl) {
        super(baseUrl);
        this.endpoint = "posts";
    }

    async getAll() {
        try {
            return await this.get(`${this.endpoint}`);
        } catch (error) {
            console.error('Error getting posts:', error);
            throw error;
        }
    }

    async getOne(postID) {
        try {
            return await this.get(`${this.endpoint}/${postID}`);
        } catch (error) {
            console.error(`Error getting post with ID ${postID}:`, error);
            throw error;
        }
    }

    async addPost(data) {
        try {
            return await this.post(this.endpoint, data);
        } catch (error) {
            console.error('Error adding comment:', error);
            throw error;
        }
    }

    async updatePost(postId, data) {
        try {
            return await this.put(`${this.endpoint}/${postId}`, data);
        } catch (error) {
            console.error(`Error updating comment with ID ${postId}:`, error);
            throw error;
        }
    }

    async deletePost(postId) {
        try {
            return await this.delete(`${this.endpoint}/${postId}`);
        } catch (error) {
            console.error(`Error deleting comment with ID ${postId}:`, error);
            throw error;
        }
    }
}


// Dữ liệu test
const commentAPI = new Comments(API_URL);
const postAPI = new Posts(API_URL);

// commentAPI.getAll().then(comments => {
//     console.log('All comments:', comments);
// }).catch(error => {
//     console.error('Error:', error);
// });

// commentAPI.getOne(2).then(comment => {
//     console.log(`Comment with ID ${comment.id}:`, comment);
// }).catch(error => {
//     console.error('Error:', error);
// });

// postAPI.getAll().then(posts => {
//     console.log('All posts:', posts);
// }).catch(error => {
//     console.error('Error:', error);
// });

// postAPI.getOne(1).then(post => {
//     console.log(`Post with ID ${post.id}:`, post);
// }).catch(error => {
//     console.error('Error:', error);
// });

// Dữ liệu test mẫu
const commentData = {
    postId: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    body: "This is a sample comment."
}

// // Sample post data
const postData = {
    title: "Sample Post",
    author: "This is a sample post.",
    userId: 1
};


// *Phần code test CRUD Comment
// commentAPI.addComment(commentData).then(newComment => {
//     console.log('Newly added comment:', newComment);
// }).catch(error => {
//     console.error('Error:', error);
// });

// commentAPI.updateComment(1, { body: "Updated comment body." }).then(updatedComment => {
//     console.log('Updated comment:', updatedComment);
// }).catch(error => {
//     console.error('Error:', error);
// });

// commentAPI.deleteComment(22).then(deletedComment => {
//     console.log('Deleted comment:', deletedComment);
// }).catch(error => {
//     console.error('Error:', error);
// });

// *Phần code test CRUD Post
// postAPI.addPost(postData).then(newPost => {
//     console.log('Newly added comment:', newPost);
// }).catch(error => {
//     console.error('Error:', error);
// });

// postAPI.updatePost(1, { title:"Hello", author: "Updated comment body." }).then(updatedPost => {
//     console.log('Updated comment:', updatedPost);
// }).catch(error => {
//     console.error('Error:', error);
// });

// postAPI.deletePost(1).then(deletedPost => {
//     console.log('Deleted comment:', deletedPost);
// }).catch(error => {
//     console.error('Error:', error);
// });