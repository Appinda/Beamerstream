import yargs from 'yargs';

function get(){
  return yargs
  .group(['headless', 'private', 'port'], 'Run')
  .option('headless', {
    alias: 'h',
    type: 'boolean',
    description: 'Run without OS interface'
  })
  .option('private', {
    type: 'boolean',
    description: 'Run without public server'
  })
  .option('port', {
    alias: 'p',
    type: 'number',
    description: 'Run on other port',
    default: 3000
  })
  .group('devport', 'Development')
  .option('devport', {
    alias: 'dp',
    type: 'number',
    description: 'Run on other port',
  })
  .argv;
}

export default {
  get
}