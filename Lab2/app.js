//* Bài 1
const result = {
    success: ["max-length", "no-amd", "prefer-arrow-duntins"],
    failure: ["no-var", "var-on-top", "linkbreak"],
    skipped: ["no-extra-semi", "no-dup-keys"]
}

const makeList = (arr) => {
    const failureItems = arr.filter(item => result.failure.includes(item));
    return failureItems;
}

const failureList = makeList(result.failure);

const htmlList = `
  <ul>
    ${failureList.map(item => `<li>${item}</li>`).join('\n')}
  </ul>
`;
// console.log(htmlList);

let show = document.getElementById("show").innerHTML = htmlList;


//* Bài 2

const source = [1,2,3,4,5,6,7,8,9,10];

const removeFirstTwo = (list) =>{
    const [a,b,...arr] = list;
    // console.log(a);
    // console.log(b);
    return arr;
};

const arrReturn = removeFirstTwo(source);
// console.log(arrReturn);
// console.log(source);


//* Bài 3
const arr1 = ['JAN', 'FEB', 'MAR', 'APR', 'MAY'];
let arr2;

arr2 = [...arr1]; 
// console.log(arr2);

//* Bài 4

const speardOut = () =>{
    let fragment = ['to', 'code'];
    let sentence = ['learning', ...fragment, 'is','fun'];
    return sentence;
}

// console.log(speardOut());