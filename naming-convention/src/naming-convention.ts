// Class to handle naming conventions for generated code.
export class NamingConvention {
  /**
   * @description Converts a string from camelCase to a NamingConvention
   */
  static fromCamel(camelCase: string): NamingConvention {
    return new NamingConvention(camelCase.split(/(?=[A-Z])/).map((word) => word[0].toUpperCase() + word.slice(1)).join(' '));
  }

  /**
   * @description Converts a string from kebab-case to a NamingConvention
   */
  static fromKebab(kebabCase: string): NamingConvention {
    return new NamingConvention(kebabCase.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' '));
  }

  /**
   * @description Converts a string from PascalCase to a NamingConvention
   */
  static fromPascal(pascalCase: string): NamingConvention {
    return new NamingConvention(pascalCase.split(/(?=[A-Z])/).map((word) => word[0].toUpperCase() + word.slice(1)).join(' '));
  }

  /**
   * @description Converts a string from snake_case to a NamingConvention
   */
  static fromSnake(snakeCase: string): NamingConvention {
    return new NamingConvention(snakeCase.split('_').map((word) => word[0].toUpperCase() + word.slice(1)).join(' '));
  }

  /**
   * @description Converts a string from Title Case to a NamingConvention
   */
  static fromTitle(titleCase: string): NamingConvention {
    return new NamingConvention(titleCase);
  }

  /**
   * @description Converts a string from a constant to a NamingConvention
   */
  static fromConstant(constant: string) {
    return new NamingConvention(constant.split('_').map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' '));
  }

  /**
   * @description Converts a string from a URL to a NamingConvention, only keeps the subdomain, domain and top level domain
   */
  static fromUrl(url: string): NamingConvention {
    return new NamingConvention(url.replace(/(https?:\/\/)?/, '')
      .split('/')[0]
      .split('.')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' '),
    );
  }

  static fromSentence(sentence: string): NamingConvention {
    return new NamingConvention(sentence.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' '));
  }

  constructor(private value: string) {
  }

  /**
   * @description Converts to camelCase
   */
  toCamel(): string {
    return this.value.split(' ').map((word, index) => index === 0 ? word.toLowerCase() : word[0].toUpperCase() + word.slice(1)).join('');
  }


  /**
   * @description Converts to kebab-case
   */
  toKebab(): string {
    return this.value.split(' ').map((word) => word.toLowerCase()).join('-');
  }

  /**
   * @description Converts to PascalCase
   */
  toPascal(): string {
    return this.value.split(' ').map((word) => word[0].toUpperCase() + word.slice(1)).join('');
  }

  /**
   * @description Converts to snake_case
   */
  toSnake(): string {
    return this.value.split(' ').map((word) => word.toLowerCase()).join('_');
  }

  /**
   * @description Converts to Title Case
   */
  toTitle(): string {
    return this.value;
  }

  toSentence() {
    return this.value.split(' ').map((word, index) => index === 0 ? word[0].toUpperCase() + word.slice(1) : word.toLowerCase()).join(' ');
  }


  toConstant() {
    return this.value.split(' ').map((word) => word.toUpperCase()).join('_');
  }
}
