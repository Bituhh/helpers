import {execSync} from 'child_process';
import {Application} from './application';
import {Logger} from './logger';
import {PackageJson} from './package-json.interface';

export class Deployment {
  private applications: Application[] = [];
  private testsFailed: boolean = false;

  addApplication(application: Application) {
    this.applications.push(application);
    return this;
  }

  async deploy(version: string, options?: { skipPublishing: boolean }) {
    this.checkVersionIsValid(version);

    for (const application of this.applications) {
      application.installRequiredPackages();
    }

    for (const application of this.applications) {
      try {
        application.runTests();
      } catch (e) {
        this.testsFailed = true;
      }
    }

    if (this.testsFailed) {
      throw new Error('One or more test failed! Applications won\'t be deployed!');
    }

    if (options?.skipPublishing) {
      Logger.log('The options skipPublishing was passed. So skipping publishing.');
      return;
    }

    for (const application of this.applications) {
      if (application.isDeployed()) {
        Logger.warn(`Application "${application.packageName}" was already deploy to handle a dependency! Skipping it...`);
        continue;
      }
      await application.deploy(version);
    }

    execSync(`npm version ${version}`, {stdio: 'inherit', cwd: '.'});
  }

  private checkVersionIsValid(version: string) {
    const packageJson: PackageJson = JSON.parse(execSync(`npm list --json`, {stdio: 'pipe', cwd: '.'}).toString());
    const currentVersionParts = packageJson.version.split('.');
    const versionParts = version.split('.');
    Logger.log(`Current version "${packageJson.version}" upgrading to "${version}"!`);
    if (packageJson.version === version) {
      throw new Error('Same Version Error - The version specified is the same as the current version.');
    }

    if (+currentVersionParts[0] > +versionParts[0]) {
      throw new Error('Major Version Error - The version specified is lower than current version.');
    }
    if (+currentVersionParts[0] === +versionParts[0]) {
      if (+currentVersionParts[1] > +versionParts[1]) {
        throw new Error('Minor Version Error - The version specified is lower than current version.');
      }

      if (+currentVersionParts[1] === +versionParts[1]) {
        if (+currentVersionParts[2] > +versionParts[2]) {
          throw new Error('Patch Version Error - The version specified is lower than current version.');
        }
      }
    }
  }
}
