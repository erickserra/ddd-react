/* eslint-disable no-console */

export class LoggerHelper {
  static error(message: string, ...args: unknown[]): void {
    if (!this.isProd()) {
      console.error(`ERROR: ${message}`, ...args);
    }
  }

  static warn(message: string, ...args: unknown[]): void {
    if (!this.isProd()) {
      console.warn(`WARN: ${message}`, ...args);
    }
  }

  static info(message: string, ...args: unknown[]): void {
    if (!this.isProd()) {
      console.info(`INFO: ${message}`, ...args);
    }
  }

  static debug(message: string, ...args: unknown[]): void {
    if (!this.isProd()) {
      console.debug(`DEBUG: ${message}`, ...args);
    }
  }

  static log(message: string, ...args: unknown[]): void {
    if (!this.isProd()) {
      console.log(`LOG: ${message}`, ...args);
    }
  }

  static table(args: unknown[]): void {
    if (!this.isProd()) {
      console.table(args);
    }
  }

  private static isProd() {
    return import.meta.env.VITE_DEPLOY_ENV === 'production';
  }
}
