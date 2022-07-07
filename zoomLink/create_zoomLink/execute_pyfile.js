const spawn = require('child_process').spawn;

const API_KEY = 'j7h6txVwQQ2376R6PScS9Q'
const API_SEC = '23D2XFywQM5v6UjeYzEJY9I6GFjSo5NP6j2o'

const result_01 = spawn('python', ['create_meeting.py', API_KEY, API_SEC]);

result_01.stdout.on('data', (result)=>{
    console.log(result.toString());
});