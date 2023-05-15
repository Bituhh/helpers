import {NamingConvention} from './naming-convention';

describe('NamingConvention', () => {
  it('should convert from camelCase', () => {
    expect(NamingConvention.fromCamel('camelCase').toCamel()).toBe('camelCase');
    expect(NamingConvention.fromCamel('camelCase').toKebab()).toBe('camel-case');
    expect(NamingConvention.fromCamel('camelCase').toPascal()).toBe('CamelCase');
    expect(NamingConvention.fromCamel('camelCase').toSnake()).toBe('camel_case');
    expect(NamingConvention.fromCamel('camelCase').toTitle()).toBe('Camel Case');
    expect(NamingConvention.fromCamel('camelCase').toSentence()).toBe('Camel case');
    expect(NamingConvention.fromCamel('camelCase').toConstant()).toBe('CAMEL_CASE');
  });

  it('should convert from kebab-case', () => {
    expect(NamingConvention.fromKebab('kebab-case').toCamel()).toBe('kebabCase');
    expect(NamingConvention.fromKebab('kebab-case').toKebab()).toBe('kebab-case');
    expect(NamingConvention.fromKebab('kebab-case').toPascal()).toBe('KebabCase');
    expect(NamingConvention.fromKebab('kebab-case').toSnake()).toBe('kebab_case');
    expect(NamingConvention.fromKebab('kebab-case').toTitle()).toBe('Kebab Case');
    expect(NamingConvention.fromKebab('kebab-case').toSentence()).toBe('Kebab case');
    expect(NamingConvention.fromKebab('kebab-case').toConstant()).toBe('KEBAB_CASE');
  })

  it('should convert from PascalCase', () => {
    expect(NamingConvention.fromPascal('PascalCase').toCamel()).toBe('pascalCase');
    expect(NamingConvention.fromPascal('PascalCase').toKebab()).toBe('pascal-case');
    expect(NamingConvention.fromPascal('PascalCase').toPascal()).toBe('PascalCase');
    expect(NamingConvention.fromPascal('PascalCase').toSnake()).toBe('pascal_case');
    expect(NamingConvention.fromPascal('PascalCase').toTitle()).toBe('Pascal Case');
    expect(NamingConvention.fromPascal('PascalCase').toSentence()).toBe('Pascal case');
    expect(NamingConvention.fromPascal('PascalCase').toConstant()).toBe('PASCAL_CASE');
  });

  it('should convert from snake_case', () => {
    expect(NamingConvention.fromSnake('snake_case').toCamel()).toBe('snakeCase');
    expect(NamingConvention.fromSnake('snake_case').toKebab()).toBe('snake-case');
    expect(NamingConvention.fromSnake('snake_case').toPascal()).toBe('SnakeCase');
    expect(NamingConvention.fromSnake('snake_case').toSnake()).toBe('snake_case');
    expect(NamingConvention.fromSnake('snake_case').toTitle()).toBe('Snake Case');
    expect(NamingConvention.fromSnake('snake_case').toSentence()).toBe('Snake case');
    expect(NamingConvention.fromSnake('snake_case').toConstant()).toBe('SNAKE_CASE');
  });

  it('should convert from Title Case', () => {
    expect(NamingConvention.fromTitle('Title Case').toCamel()).toBe('titleCase');
    expect(NamingConvention.fromTitle('Title Case').toKebab()).toBe('title-case');
    expect(NamingConvention.fromTitle('Title Case').toPascal()).toBe('TitleCase');
    expect(NamingConvention.fromTitle('Title Case').toSnake()).toBe('title_case');
    expect(NamingConvention.fromTitle('Title Case').toTitle()).toBe('Title Case');
    expect(NamingConvention.fromTitle('Title Case').toSentence()).toBe('Title case');
    expect(NamingConvention.fromTitle('Title Case').toConstant()).toBe('TITLE_CASE');
  })

  it('should convert from sentence', () => {
    expect(NamingConvention.fromSentence('This is a sentence').toCamel()).toBe('thisIsASentence');
    expect(NamingConvention.fromSentence('This is a sentence').toKebab()).toBe('this-is-a-sentence');
    expect(NamingConvention.fromSentence('This is a sentence').toPascal()).toBe('ThisIsASentence');
    expect(NamingConvention.fromSentence('This is a sentence').toSnake()).toBe('this_is_a_sentence');
    expect(NamingConvention.fromSentence('This is a sentence').toTitle()).toBe('This Is A Sentence');
    expect(NamingConvention.fromSentence('This is a sentence').toSentence()).toBe('This is a sentence');
    expect(NamingConvention.fromSentence('This is a sentence').toConstant()).toBe('THIS_IS_A_SENTENCE');
  });

  it('should convert from constant', () => {
    expect(NamingConvention.fromConstant('CONSTANT_VALUE').toCamel()).toBe('constantValue');
    expect(NamingConvention.fromConstant('CONSTANT_VALUE').toKebab()).toBe('constant-value');
    expect(NamingConvention.fromConstant('CONSTANT_VALUE').toPascal()).toBe('ConstantValue');
    expect(NamingConvention.fromConstant('CONSTANT_VALUE').toSnake()).toBe('constant_value');
    expect(NamingConvention.fromConstant('CONSTANT_VALUE').toTitle()).toBe('Constant Value');
    expect(NamingConvention.fromConstant('CONSTANT_VALUE').toSentence()).toBe('Constant value');
    expect(NamingConvention.fromConstant('CONSTANT_VALUE').toConstant()).toBe('CONSTANT_VALUE');
  });
});
