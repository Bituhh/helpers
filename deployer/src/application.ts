import {execSync} from 'child_process';
import path from 'path';
import {Logger} from './logger';
import {PackageJson} from './package-json.interface';

export interface ApplicationDependency {
  name: string;
  version: string;
}

export class Application {

  private packageJson: PackageJson;
  private deployed: boolean = false;
  public dependencies: Application[] = [];

  constructor(public packageName: string, public location: string, public shouldRunTests: boolean = false) {
    this.location = path.join(process.cwd(), this.location);
    this.packageJson = this.getPackageJson();
  }

  dependsOn(application: Application) {
    this.dependencies.push(application);
    return this;
  }

  isDeployed() {
    return this.deployed;
  }

  async deployDependenciesIfNeeded(version: string, hierarchy: number) {
    for (let dependency of this.dependencies) {
      if (!dependency.isDeployed()) {
        Logger.setHierarchy(hierarchy)
          .warn(`Application "${this.packageName}" depends on "${dependency.packageName}", so dependency will be deployed first!`);
        await dependency.deploy(version, ++hierarchy);
      }
    }
  }

  private getPackageJson() {
    try {
      return JSON.parse(execSync('npm.cmd list --json', {stdio: 'pipe', cwd: this.location}).toString());
    } catch (err) {
      console.error(err);
      throw new Error('Unable to determine the dependencies of this project.');
    }
  }

  private getDependencies(): ApplicationDependency[] {
    const dependencies: ApplicationDependency[] = [];
    for (const key in this.packageJson.dependencies) {
      if (this.packageJson.dependencies.hasOwnProperty(key)) {
        dependencies.push({name: key, version: this.packageJson.dependencies[key].version});
      }
    }
    return dependencies;
  }

  hasDependencies(): boolean {
    return this.dependencies.length > 0;
  }

  private async wait(milliseconds: number) {
    return new Promise(resolve => {
      setTimeout(resolve, milliseconds);
    });
  }

  installRequiredPackages() {
    Logger.log(`\nInstalling required packages for "${this.packageName}"...`);

    Logger.setHierarchy(1).log(`Installing typescript...`);
    execSync('npm.cmd install -D typescript', {stdio: 'inherit', cwd: this.location});

    Logger.setHierarchy(1).log(`Installing npm-check-updates...`);
    execSync('npm.cmd install -D npm-check-updates', {stdio: 'inherit', cwd: this.location});

    if (this.shouldRunTests) {
      Logger.setHierarchy(1).log(`Installing typescript...`);
      execSync('npm.cmd install -D jest ts-jest @types/jest', {stdio: 'inherit', cwd: this.location});
    }

    Logger.log(`All required packages for "${this.packageName}" was installed.\n`);
  }

  async deploy(version: string, hierarchy: number = 0) {
    Logger.newLine();
    Logger.setHierarchy(hierarchy).log(`Deploying "${this.packageName}"...`);
    await this.handleDependencies(version, hierarchy);
    await this.compilePackage(hierarchy);
    await this.publishPackage(version, hierarchy);
    this.deployed = true;
    Logger.setHierarchy(hierarchy).log(`Application "${this.packageName}" was deployed.\n`);
    Logger.newLine();
  }

  private async handleDependencies(version: string, hierarchy: number) {
    if (this.hasDependencies()) {
      await this.deployDependenciesIfNeeded(version, hierarchy);

      Logger.setHierarchy(hierarchy).log(`Updating dependencies of "${this.packageName}"...`);
      execSync('npx ncu -u', {stdio: 'inherit', cwd: this.location});

      Logger.setHierarchy(hierarchy).log(`Installing dependencies for "${this.packageName}"...`);
      execSync(`npm.cmd install`, {stdio: 'inherit', cwd: this.location});
    }
  }

  runTests() {
    if (this.shouldRunTests) {
      Logger.newLine();
      Logger.log(`Running tests for "${this.packageName}"...`);
      execSync(`npx jest`, {stdio: 'inherit', cwd: this.location});
      Logger.newLine();
    }
  }

  private async compilePackage(hierarchy: number) {
    Logger.setHierarchy(hierarchy).log('Compiling typescript...');
    execSync(`npx tsc`, {stdio: 'inherit', cwd: this.location});
  }

  private async publishPackage(version: string, hierarchy: number) {
    Logger.newLine();
    Logger.setHierarchy(hierarchy).log(`Updating version to ${version}...`);
    execSync(`npm version ${version}`, {stdio: 'inherit', cwd: this.location});

    Logger.setHierarchy(hierarchy).log(`Publishing package "${this.packageName}" ...`);
    execSync(`npm publish --access public`, {stdio: 'inherit', cwd: this.location});
    await this.wait(5000);
    Logger.newLine();
  }
}

