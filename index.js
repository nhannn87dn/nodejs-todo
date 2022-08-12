const app = require('./app'); //express
const config = require("./config/config");
const mongosee = require('mongoose');

let server;

mongosee
.connect(config.mongosee.url)
.then(()=> {
    console.log('Connected to MongoDB');
    server = app.listen(config.port, () => {
        console.log(`Listening on port ${config.port}`);
    });
})
.catch((err)=> console.log("faild to connect to DB", err));



const exitHandler = ()=>{
    if(server){
        process.exit(1);
    }else{
        process.exit(1);
    }
}

const unexpectedErrorHandler = (err)=> {
    console.log('unexpected Error', err);
    exitHandler();
}

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection",unexpectedErrorHandler);
process.on("SIGTERM",()=>{
    if(server){
        server.close();
    }
}); // signal to terminal the process



