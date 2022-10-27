import {execSync} from 'child_process';
import {log} from 'util';
import {Application} from './application';
import {Deployment} from './deployment';

const args = process.argv.slice(2);
const version = args[0];
if (!version) {
  throw new Error('Version not passed!');
}

if (!version.match(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/)) {
  throw new Error('Version must follow Semantic Versioning. For details please see: https://semver.org/');
}

const random = new Application('@bituhh/random', '../random');
const logger = new Application('@bituhh/logger', '../logger');
const api = new Application('@bituhh/api', '../api', true)
  .dependsOn(logger);

new Deployment()
  .addApplication(random)
  .addApplication(logger)
  .addApplication(api)
  .deploy(args[0], {skipPublishing: true});
