export enum CaseType {
  upper,
  lower,
  mixed,
}

export class Random {
  static alphanumeric(length: number = 16): string {
    let string = '';
    for (let i = 0; i < length; i++) {
      if (Math.random() > 0.5) {
        string += Random.character(CaseType.mixed);
      } else {
        string += `${Random.number(10)}`;
      }
    }
    return string;
  }

  static number(max: number = 1000): number {
    return Math.floor(Math.random() * max);
  }

  static character(caseType: CaseType = CaseType.lower): string {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    switch (caseType) {
      case CaseType.mixed:
        if (Math.random() > 0.5) {
          return characters[Random.number(characters.length)].toUpperCase();
        } else {
          return characters[Random.number(characters.length)];
        }
      case CaseType.upper:
        return characters[Random.number(characters.length)].toUpperCase();
      case CaseType.lower:
      default:
        return characters[Random.number(characters.length)];
    }
  }

  static string(length: number = 16, caseType: CaseType = CaseType.mixed): string {
    let string = '';
    for (let i = 0; i < length; i++) {
      string += Random.character(caseType);
    }
    return string;
  }

  static array(size: number = 100, maxValueInArray: number = 1000): number[] {
    const array = new Array(size);
    for (let i = 0; i < array.length; i++) {
      array[i] = Random.number(maxValueInArray);
    }
    return array;
  }

  private static columns(length: number = 10): { [key: string]: string } {
    const obj: { [key: string]: string } = {};
    for (let i = 0; i < length; i++) {
      obj[Random.alphanumeric()] = Random.alphanumeric();
    }
    return obj;
  };

  static table(maxColumnLength: number = 100, maxRowLength: number = 1000): { [key: string]: any }[] {
    const columnsLength = Random.number(maxColumnLength) + 1;
    const rowLength = Random.number(maxRowLength) + 1;
    const array = [];
    for (let i = 0; i < rowLength; i++) {
      array.push(Random.columns(columnsLength));
    }
    return array;
  };

  static object(maxSize: number = 10): { [key: string]: string } {
    const size = Random.number(maxSize);
    const obj: { [key: string]: string } = {};
    for (let i = 0; i < size; i++) {
      obj[Random.alphanumeric()] = Random.alphanumeric();
    }
    return obj;
  }
}
