// const student = 'honours';

// const classIterator = student[Symbol.iterator]();
// console.log(classIterator.next());

// while(true) {
//     const result = (classIterator.next());
//     if(result.done === true) {
//         break;
//     }

//     console.log(result.value);
// }

/**
 * Concept of Iterator -
 * 1) Adding [Symbol.iterator] function.
 * 2) When it will be called it will return an object.
 * 3) this object will contain a function called next.
 * 4) When next() will be called it will return an object consists of two value. One is actual value and the other is done property.
 */

// const range = {
//     start: 0,
//     stop: 100,
//     step: 5
// }

// range[Symbol.iterator] = function () {
//     let current = this.start;
//     let step = this.step;
//     let stop = this.stop;
//     return {
//         next: function () {
//             let o = {
//                 value: current,
//                 done: current > stop
//             }
//             current += step;
//             return o;
//         }
//     }
// }

// const rangeIterator = range[Symbol.iterator]();

// do {
//     const result = (rangeIterator.next());
//     console.log(result);
//     if(result.done === true) {
//         break;
//     }
// } while (true);

// for (let v of range) {
//     console.log(v);
// }

// function* generator() {
//     yield 1;
//     yield 2;
//     yield 3;
// }

// const It = generator();
// console.log(It.next());
// console.log(It.next());
// console.log(It.next());
// console.log(It.next());

// function* myGenerator(start = 0, stop = 100, step = 5) {
//     for (let i = start; i < stop; i += step) {
//         yield i;
//     }
// }

/**
 * Impliment in another way -
 */
// const range = {
//     start: 0,
//     stop: 100,
//     step: 10
// }

// range[Symbol.iterator] = function* myGenerator() {
//     const start = this.start;
//     const stop = this.stop;
//     const step = this.step;
    
//     for(let i = 0; i <= stop; i += step) {
//         yield i;
//     }
// }

// for (let v of range) {
//     console.log(v)
// }


// const generateIt = myGenerator(1, 10, 2);

// console.log(generateIt.next());
// console.log(generateIt.next());
// console.log(generateIt.next());
// console.log(generateIt.next());
// console.log(generateIt.next());
// console.log(generateIt.next());

const axios = require('axios')

async function getUsers() {
    const url = `https://jsonplaceholder.typicode.com/users`;
    const {data: users} = await axios.get(url);
    return users;
}

/**
 * Async iterator function -
 */
function getPostsByUser(users) {
    let start = 0;
    const stop = users.length;
    return {
        async next() {
            // const url = `https://jsonplaceholder.typicode.com/posts`
            // const {data: posts} = await axios.get(`${url}?userId=${users[start++].id}`);
            
            // const o = {
            //     value: posts,
            //     done: start > stop
            // }
            // return o;
            if(start > users.length - 1) {
                return {
                    value: undefined,
                    done: true
                }
            } 
            
            const url = `https://jsonplaceholder.typicode.com/posts`
            const {data: posts} = await axios.get(`${url}?userId=${users[start++].id}`);
                
            return {
                value: posts,
                done: false
            }
        }
    }
}

/**
 * Async generator function -
 */
// async function* getPostsByUser(users) {
//     const url = `https://jsonplaceholder.typicode.com/posts`;
//     for (let i = 0; i < users.length; i++) {
//         const {data: posts} = await axios.get(`${url}?userId=${users[i].id}`);
//         yield posts;
//     }
// }

const result = getUsers();
result.then(async (users) => {
    const userIterator = await getPostsByUser(users);
    // userIterator.next();
    // userIterator.next();
    // userIterator.next();
    // const r = userIterator.next()
    // return r;
    do {
        const r = await userIterator.next();
        if (r.done === true) break;
        console.log(r);
    }while(true)
})
// .then(r => console.log(r))
.catch(e => console.log(e));