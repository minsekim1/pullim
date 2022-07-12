const spawn = require('child_process').spawn;

const API_KEY1 = "vW7c2BXWRz-8M1C1ivprFQ"
const API_SEC1 = "agQZXmkJmTBcKZe91jSULBTgMROeDTTnSerB"

let result_url = ''
let result_pw = ''
let URL = ''

async function makeLink (API_KEY, API_SEC){
    const result_01 = await spawn('python3', ['create_meeting.py', API_KEY, API_SEC]);
    await result_01.stdout.on('data', (result)=>{
        URL = result.toString();
        URL = URL.split(',');
        console.log(URL)
        return URL
    });
}

const data = makeLink(API_KEY1,API_SEC1);
console.log("-----------------")
console.log(1)
console.log(data)
console.log("-----------------")

// (async () => {
//     const condition = true;
//     const promise = new Promise((resolve, reject) => {
//         if (condition) {
//         const result1 = makeLink(API_KEY1, API_SEC1)
//         result_url = result1[0]
//         result_pw = result1[1]
//         console.log('1:'+result_url)
//         console.log('2:'+result_pw)
//             resolve('resolved');
//         } else {
//             reject('rejected');
//         }
//     });
    
//     try {
//         const result = await promise;
//         console.log(result);
//     } catch (err) {
//         console.error(err);
//     }
// })()
module.exports = { makeLink }
