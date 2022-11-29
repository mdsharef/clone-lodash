/**
 * Implementing Lodash functions in my own style.
 * Lodash is a functional library of javascript language.
 */

const myLodash = {
    // chunk: (arr, range) => {
    //     const chunked_arr = [];
    //     for (let i = 0; i < arr.length; i + i++) {
    //         const last = chunked_arr[chunked_arr.length - 1];
    //         if(!last || last.length === range) {
    //             chunked_arr[chunked_arr.length] = ([arr[i]])
    //         } else {
    //             last[last.length] = arr[i]
    //         }
    //     }
    //     return chunked_arr;
    // }
    // chunk: (arr, range) => {
    //     const chunked_arr = [];
    //     for (let i = 0; i < arr.length; i++) {
    //         // const last = chunked_arr[chunked_arr.length - 1];
    //         if(!(chunked_arr[chunked_arr.length - 1]) || (chunked_arr[chunked_arr.length - 1]).length === range) {
    //             chunked_arr[chunked_arr.length] = [arr[i]];
    //         } else {
    //             (chunked_arr[chunked_arr.length - 1])[(chunked_arr[chunked_arr.length - 1]).length] = arr[i];
    //         }
    //     }
    //     return chunked_arr;
    // }
    // chunk: (arr, range) => {
    //     const chunked_arr = [];
    //     const copied = [...arr];
    //     const numOfChild = Math.ceil(copied.length / range)

    //     for(let i = 0; i < numOfChild; i++) {
    //         chunked_arr.push(copied.splice(0, range))
    //     }
    //     return chunked_arr;
    // }
    chunk: (arr, range) => {
        const chunked_arr = [];
        let index = 0;
        while(index < arr.length) {
            chunked_arr.push(arr.slice(index, index + range))
            index += range
        }
        return chunked_arr;
    },
    // compact: (arr) => {
    //     arr = arr.filter(v => typeof v === 'number')
    //     return arr;
    // }
    compact: (arr) => {
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - 1; j++) {
                if(!arr[j] || typeof arr[j] !== 'number') {
                    arr[j] = arr[j + 1];
                    arr[j + 1] = undefined;
                }
            }
        }
        for (let i = 0; i < arr.length; i++) {
            if(arr[i] === undefined) {
                count++;
            }
        }
        arr.length = arr.length - count;
        return arr;
    },
    // concat: function () {
    //     const arr = Array.prototype.slice.call(arguments);
    //     let newArr = []
    //     for (let i = 0; i < arr.length; i++) {
    //         newArr = arr[0].concat(arr[i]);
    //     }
    //     return newArr;
    // }
    // concat: function() {
    //     const arr = [...arguments];
    //     const newArr = arr.reduce((acc, cur)=> {
    //         return acc = acc.concat(cur);
    //     }, []);
    //     return newArr;
    // }
    concat: function() {
        const arr = [...arguments];
        let newArr = [];
        arr.forEach((v)=> {
            newArr = newArr.concat(v);
        });
        const returnArr = newArr.reduce((acc, cur) => {
            return acc = acc.concat(cur);
        }, []);
        return returnArr;
    },
    difference: (arr1, arr2) => {
        // const result = [];
        for(let i = 0; i < arr1.length; i++) {
            for(let j = 0; j < arr2.length; j++) {
                if(arr1[i] === arr2[j]) {
                    arr1.splice(i, 1);
                }
            }
        }
        return arr1;
    }
}

const arr1 = [1, 2, 3, 5]
const arr2 = [1, 5]

const result = myLodash.difference(arr1, arr2)

console.log(result)