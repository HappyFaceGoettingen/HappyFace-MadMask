#!/usr/bin/node

// Libraries
var program = require('commander');
var exec = require('child_process').exec;


function my_exec(commandLine){
    a = exec(commandLine, {maxBuffer: 2000 * 1024});
    a.stdout.pipe(process.stdout);
    a.stderr.pipe(process.stderr);
}



program
    .version('0.1.0')
    .option('-p, --port [port]', 'Select server port')
    .parse(process.argv);



if(program.rawArgs.length <= 2) {
    program.help();
    process.exit(0);
} else {
    console.log('Port: %s', program.port);
    my_exec("ionic serve -d -b -a -s -p " + program.port);
}
