export class Logger {

  static log(message: any): void;
  static log(messageA: any, messageB: any): void;
  static log(messageA: any, messageB: any, messageC: any): void;
  static log(messageA: any, messageB: any, messageC: any, messageD: any): void;
  static log(messageA: any, messageB: any, messageC: any, messageD: any, messageE: any): void;
  static log(...messages: any[]): void {
    new Logger().log(...messages);
  }

  static warn(message: any): void;
  static warn(messageA: any, messageB: any): void;
  static warn(messageA: any, messageB: any, messageC: any): void;
  static warn(messageA: any, messageB: any, messageC: any, messageD: any): void;
  static warn(messageA: any, messageB: any, messageC: any, messageD: any, messageE: any): void;
  static warn(...messages: any[]): void {
    new Logger().warn(...messages);
  }

  static newLine() {
    new Logger().log('\n');
  }

  private level: number = 0;

  static setHierarchy(level: number): Logger {
    const logger = new Logger();
    logger.level = level;
    return logger;
  }

  log(...messages: any[]): void {
    const [firstMessage,...remainingMessage] = messages;
    console.log(`${'#'.repeat(this.level)}${this.level > 0 ? ' ': ''}${firstMessage}`, ...remainingMessage);
  }

  warn(...messages: any[]): void {
    const [firstMessage,...remainingMessage] = messages;
    console.warn(`${'#'.repeat(this.level)}${this.level > 0 ? ' ': ''}${firstMessage}`, ...remainingMessage);
  }


}
