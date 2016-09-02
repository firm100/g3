#!/usr/bin/env node

import * as program from 'commander'
import * as cli from './cli'
import * as lib from './lib'
import * as home from './home'
var packageJson = require('./resources/package.json')

program
  .version('G3 Version: ' + packageJson.version)
  .option('-C, --chdir <path>', 'change the working directory')
  .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
  .option('-T, --no-tests', 'ignore test hook')

program
  .command('build [directory]')
  .alias('b')
  .description('run setup commands for all directorys')
  .option("-s, --setup_mode [mode]", "Which setup mode to use")
  .action(function(directory) {
    directory = directory || './'
    cli.build(directory)
  })

program
  .command('parse [directory]')
  .alias('p')
  .description('run setup commands for all directorys')
  .option("-s, --setup_mode [mode]", "Which setup mode to use")
  .action(function(directory) {
    directory = directory || './'
    cli.parse(directory)
  })

program
  .command('run [directory]')
  .alias('r')
  .description('run setup commands for all directorys')
  .option("-s, --setup_mode [mode]", "Which setup mode to use")
  .action(function(directory) {
    directory = directory || './'
    cli.run(directory)
  })

program
  .command('serve [directory]')
  .alias('s')
  .description('execute the given remote directory')
  .option("-e, --exec_mode <mode>", "Which exec mode to use")
  .action(function(directory) {
    directory = directory || './'
    cli.serve(directory)
  }).on('--help', function() { })

program
  .command('status [directory]')
  .description('execute the given remote directory')
  .action(function(directory) {
    directory = directory || './'
    cli.status(directory)
  }).on('--help', function() { })

program
  .command('test')
  .action(function(cmd){
    const homeConfig = home.getConfig()
    console.log(homeConfig);
  });

program
  .command('*')
  .action(function(cmd){
    console.log(`${cmd} is not a g3 command.\nSee 'g3 --help'.\n`);
  });

program.parse(process.argv)
