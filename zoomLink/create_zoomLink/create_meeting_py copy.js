// const spawn = require('child_process').spawn;


// async function makeLink (API_KEY, API_SEC){
//     const result_01 = spawn('python', ['create_meeting.py', API_KEY, API_SEC]);
//     let URL = ''

//     result_01.stdout.on('data', (result)=>{
//         // console.log(result.toString());
//         URL = result.toString()
//         URL = URL.split(',')
//         console.log('URL: ' + URL)
//         // return URL
//     });

//     console.log('2.'+URL);

//     return result_01
// }

const express = require('express')
const app = express()

// const API_KEY = 'j7h6txVwQQ2376R6PScS9Q'
// const API_SEC = '23D2XFywQM5v6UjeYzEJY9I6GFjSo5NP6j2o'

const API_KEY = "qBe5H2u-RGGeWSVmi7g6hw"
const API_SEC = "SKS6HE7FwEgLqtlj1fvPxmjoKAB04ZBNTcPI"
console.log('1')
let runPy = new Promise(function(success, nosuccess) {

    const { spawn } = require('child_process');
    const pyprog = spawn('python', ['./create_meeting.py', API_KEY, API_SEC]);
    let URL = ''
    console.log('2')
    pyprog.stdout.on('data', function(data) {
        URL = data.toString()
        URL = URL.split(',')
        console.log('URL: ' + URL)
        console.log('3')
        success(data);
        return URL
    });

    pyprog.stderr.on('data', (data) => {

        nosuccess(data);
    });
});

app.get('/', (req, res) => {

    res.write('welcome\n');

    runPy.then(function(fromRunpy) {
        console.log(fromRunpy.toString());
        res.end(fromRunpy);
    });
})

// makeLink(API_KEY1, API_SEC1)
// console.log(makeLink(API_KEY1, API_SEC1))
// module.exports = { makeLink }
