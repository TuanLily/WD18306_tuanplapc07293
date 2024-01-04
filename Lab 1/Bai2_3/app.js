let name1 = "Hung";
let age1 = "18";
//* Arrow Function
let sayHello1 = () => {
    // console.log("I'm "  + name1 + ". I'm " + age1 + ".");
    console.log(`I'm ${name1}. I'm ${age1}`);
}

sayHello1();

let name2 = "TuanLily";
let birthday = "02/11/2004";
let today = new Date();
let CurrentYear = today.getFullYear();
let myYear = "2004";
//* Arrow Function
let sayHello2 = () => {
    console.log(`I'm ${name2}. Birthday ${CurrentYear - myYear}`);
}

sayHello2();
const API_URL = "https://jsonplaceholder.typicode.com/posts/1";
 /**
             * let list = data.data;
             * list.forEach(elemen``t => {
                console.log(element);
             });
             */
fetch("https://www.boredapi.com/api/activity")
    .then((response) => {
        response.json().then((data) =>{
            let app = document.getElementById("pc07293");
            let html = `<ul>
                <li>${data.accessibility}</li>
                <li>${data.activity}</li>
                <li>${data.key}</li>
                <li>${data.price}</li>
                <li>${data.participants}</li>
                <li>${data.type}</li>
            </ul>`;
            app.innerHTML = html;
            console.log(data);
        })
        
    })
    .catch((error) => {
        console.log(error);
    })

