const server = require('./server.js')

const port = 9999;

server.listen(port, ()=> console.log(`n*** API UP AND RUNNING ON PORT ${port}**`));