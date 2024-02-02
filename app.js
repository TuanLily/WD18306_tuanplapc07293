import { API_URL } from './Base/APICaller.js';
import ListComment from './modules/comments/index.js';
import ListPost from './modules/posts/index.js';
import * as stringFunctions from './Lab_6/index.js';




// ! Lab 6.2

const dataUppercase = stringFunctions.uppercaseString('hello');

const dataLowercase = stringFunctions.lowercaseString('WORLD!')


console.log(dataUppercase);
console.log(dataLowercase);



// ! Lab 6.4
import { subtract } from './Lab_6/index.js';

console.log('>>> Giá trị trả về của hàm subtract:', subtract(7, 4));



//! Lab 6.5

const postAPI = new ListPost(API_URL); // *Chỗ test dữ liệu của chức năng Gọi Post API

postAPI.getAllListPosts().then(posts => {
    console.log('All Post:', posts);
}).catch(error => {
    console.error('Error:', error);
});

postAPI.getOnePosts(2).then(posts => {
    console.log(`>>> Show Post with ID ${posts.id}:`, posts);
}).catch(error => {
    console.error('Error:', error);
});


const commentAPI = new ListComment(API_URL); // *Chỗ test dữ liệu của chức năng Gọi Comment API

commentAPI.getAllListComments().then(posts => {
    console.log('All Comments:', posts);
}).catch(error => {
    console.error('Error:', error);
});

commentAPI.getOneComment(1).then(posts => {
    console.log(`>>> Show Comment with ID ${posts.id}:`, posts);
}).catch(error => {
    console.error('Error:', error);
});

