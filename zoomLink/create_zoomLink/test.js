const spawn = require('child_process').spawn;

const API_KEY1 = 'j7h6txVwQQ2376R6PScS9Q'
const API_SEC1 = '23D2XFywQM5v6UjeYzEJY9I6GFjSo5NP6j2o'

async function makeLink (API_KEY, API_SEC){
    const result_01 = spawn('python', ['create_meeting.py', API_KEY, API_SEC]);
    let URL = ''
    console.log(result_01)
    result_01.stdout.on('data', (result)=>{
        // console.log(result.toString());
        URL = result.toString()
        URL = URL.split(',')
        console.log('URL: ' + URL)
        // return URL
    });

    console.log('2.'+URL);

    return result_01
}
makeLink(API_KEY1, API_SEC1)
// console.log(makeLink(API_KEY1, API_SEC1))
module.exports = { makeLink }
