import { ChalkInstance } from "chalk";

class Logger {
  private currentMessage: any;

  constructor(snipts: any) {
    this.currentMessage = snipts;
  }

  /**
     * Adds a timestamp to the log currentMessage.
     * @param format (Optional) Format for the timestamp ('short', 'long', or custom Date options).
     * @returns The Logger instance for chaining.
     */
  timeStamp(format: 'short' | 'long' | Intl.DateTimeFormatOptions = 'short'): Logger {
    let dateString: string;
    const now = new Date();

    if (format === 'short') {
      dateString = now.toLocaleTimeString(); // e.g., 3:45:01 PM
    } else if (format === 'long') {
      dateString = now.toLocaleString(); // e.g., 7/19/2025, 3:45:01 PM
    } else {
      dateString = now.toLocaleString(undefined, format);
    }
    this.currentMessage = `[${dateString}] ${this.currentMessage}`;
    return this;
  }

  /**
   * adds modes like success , error etc
   * @param mode 
   * @returns 
   */

  label(mode: string): Logger {
    this.currentMessage = `[${mode.toUpperCase()}] ${this.currentMessage}`;
    return this
  }

  log(func: ChalkInstance, currentMessage: any): void {
    if (Array.isArray(currentMessage) || this._isPlainObjectArray(currentMessage)) {
      console.table(currentMessage);
    } else {
      const formatted =
        typeof currentMessage === 'object'
          ? JSON.stringify(currentMessage, null, 2)
          : currentMessage;

      console.log(func(`${this.currentMessage} ${formatted}`));
    }
    this._clearState();
  }

  error(func: ChalkInstance, currentMessage: any): void {
    if (Array.isArray(currentMessage) || this._isPlainObjectArray(currentMessage)) {
      console.table(currentMessage);
    } else {
      const formatted =
        typeof currentMessage === 'object'
          ? JSON.stringify(currentMessage, null, 1)
          : currentMessage;

      console.error(func(`${this.currentMessage} ${formatted}`));
    }
    this._clearState();
  }

  private _clearState(): Logger {
    this.currentMessage = '';
    return this;
  }
  private _isPlainObjectArray(value: any): boolean {
    return Array.isArray(value) && value.every(item => typeof item === 'object');
  }

}

const clog = new Logger('');
export default clog