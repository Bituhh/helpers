export interface PackageJson {
  version: string;
  name: string;
  dependencies: PackageJsonDependencies;
}

export interface PackageJsonDependencies {
  [key: string]: PackageJsonDependency;
}

export interface PackageJsonDependency {
  version: string;
  resolved: string;
  overridden: boolean;
}

