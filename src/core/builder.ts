import chalk, { ChalkInstance } from "chalk";
import { ChalkColor, ChalkBackgroundColor } from "../type/logger";
import clog from "./logger";

// --- New Type for Callable Logger Builder ---
// This type represents a LoggerBuilder that can also be called as a function.
export type CallableLoggerBuilder = LoggerBuilder & ((message: any) => LoggerBuilder);

class LoggerBuilder {
    private func: ChalkInstance;
    private styleAppliedExplicitly: boolean;
    private bgStyleAppliedExplicitly: boolean;

    constructor(func: ChalkInstance = chalk) {
        this.func = func;
        this.styleAppliedExplicitly = false;
        this.bgStyleAppliedExplicitly = false;
    }

    // Private helper to create a callable version of 'this'
    private _makeCallable(): CallableLoggerBuilder {
        // Capture the current 'this' (the LoggerBuilder instance)
        const currentBuilder = this;

        // Define the function that will be called if the user does logger.bold("message")
        const callable = function (message: any): LoggerBuilder {
            // Apply the style that led to this callable, then log as info
            // The style should already be applied to currentBuilder.func

            currentBuilder.default(message)
            // After logging, reset state and return a new instance for fresh chaining
            currentBuilder.resetState();
            return new LoggerBuilder();
        } as CallableLoggerBuilder; // Type assertion

        // Copy all properties and methods from the current LoggerBuilder instance
        // to the callable function, so it can still be chained (e.g., logger.bold.color('red'))
        Object.setPrototypeOf(callable, currentBuilder);

        return callable;
    }

    // --- Foreground Color Methods ---
    // These remain methods because they take arguments (e.g., color('red'), rgb(1,2,3))
    // We'll return a _makeCallable() result at the end of them.

    /**
     * 
     * @param color 
     * @param message 
     * @returns 
     */

    color(color: ChalkColor, message?: any): LoggerBuilder {
        if (typeof this.func[color] === 'function') {
            this.func = this.func[color];
            this.styleAppliedExplicitly = true;
        } else {
            console.warn(`Chalk foreground color method "${color}" not found or is not a function. Resetting styles.`);
            this.resetState();
        }
        return message ? this.info(message) : this._makeCallable(); // Log if message, otherwise return callable
    }

    /**
     * 
     * @param r 
     * @param g 
     * @param b 
     * @param message 
     * @returns 
     */

    rgb(r: number, g: number, b: number, message?: any): LoggerBuilder {
        if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
            console.warn(`Invalid RGB values provided. Each component must be between 0 and 255. Resetting styles.`);
            this.resetState();
            return this; // Cannot chain or log after invalid input
        }
        this.func = this.func.rgb(r, g, b);
        this.styleAppliedExplicitly = true;
        return message ? this.info(message) : this._makeCallable();
    }

    /**
     * 
     * @param hexCode 
     * @param message 
     * @returns 
     */

    hex(hexCode: string, message?: any): LoggerBuilder {
        if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hexCode)) {
            console.warn(`Invalid Hex color code provided: "${hexCode}". Resetting styles.`);
            this.resetState();
            return this; // Cannot chain or log after invalid input
        }
        this.func = this.func.hex(hexCode);
        this.styleAppliedExplicitly = true;
        return message ? this.info(message) : this._makeCallable();
    }

    /**
     * 
     * @param code 
     * @param message 
     * @returns 
     */

    ansi256(code: number, message?: any): LoggerBuilder {
        if (code < 0 || code > 255) {
            console.warn(`Invalid ANSI 256 color code provided: ${code}. Must be between 0 and 255. Resetting styles.`);
            this.resetState();
            return this; // Cannot chain or log after invalid input
        }
        this.func = this.func.ansi256(code);
        this.styleAppliedExplicitly = true;
        return message ? this.info(message) : this._makeCallable();
    }

    /**
     * 
     * @param bgColor 
     * @param message 
     * @returns 
     */

    // --- Background Color Methods ---
    bg(bgColor: ChalkBackgroundColor, message?: any): LoggerBuilder {
        if (typeof this.func[bgColor] === 'function') {
            this.func = this.func[bgColor];
            this.bgStyleAppliedExplicitly = true;
        } else {
            console.warn(`Chalk background color method "${bgColor}" not found or is not a function. Resetting styles.`);
            this.resetState();
        }
        return message ? this.info(message) : this._makeCallable();
    }

    /**
     * 
     * @param r 
     * @param g 
     * @param b 
     * @param message 
     * @returns 
     */

    bgRgb(r: number, g: number, b: number, message?: any): LoggerBuilder {
        if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
            console.warn(`Invalid background RGB values provided. Each component must be between 0 and 255. Resetting styles.`);
            this.resetState();
            return this; // Cannot chain or log after invalid input
        }
        this.func = this.func.bgRgb(r, g, b);
        this.bgStyleAppliedExplicitly = true;
        return message ? this.info(message) : this._makeCallable();
    }

    /**
     * 
     * @param hexCode 
     * @param message 
     * @returns 
     */

    bgHex(hexCode: string, message?: any): LoggerBuilder {
        if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hexCode)) {
            console.warn(`Invalid Hex background color code provided: "${hexCode}". Resetting styles.`);
            this.resetState();
            return this; // Cannot chain or log after invalid input
        }
        this.func = this.func.bgHex(hexCode);
        this.bgStyleAppliedExplicitly = true;
        return message ? this.info(message) : this._makeCallable();
    }

    /**
     * 
     * @param code 
     * @param message 
     * @returns 
     */

    bgAnsi256(code: number, message?: any): LoggerBuilder {
        if (code < 0 || code > 255) {
            console.warn(`Invalid ANSI 256 background color code provided: ${code}. Must be between 0 and 255. Resetting styles.`);
            this.resetState();
            return this; // Cannot chain or log after invalid input
        }
        this.func = this.func.bgAnsi256(code);
        this.bgStyleAppliedExplicitly = true;
        return message ? this.info(message) : this._makeCallable();
    }

    // --- Style Modifiers (Getters that return a callable builder) ---
    // These are getters, so they don't take arguments directly.
    // They modify this.func and then return a callable version of this builder.

    /**
     * @param message - optional
     */
    get bold(): CallableLoggerBuilder {
        this.func = this.func.bold; // Assign the chained chalk instance
        this.styleAppliedExplicitly = true;
        return this._makeCallable(); // Return the callable builder
    }

    get dim(): CallableLoggerBuilder {
        this.func = this.func.dim;
        this.styleAppliedExplicitly = true;
        return this._makeCallable();
    }

    get italic(): CallableLoggerBuilder {
        this.func = this.func.italic;
        this.styleAppliedExplicitly = true;
        return this._makeCallable();
    }

    get underline(): CallableLoggerBuilder {
        this.func = this.func.underline;
        this.styleAppliedExplicitly = true;
        return this._makeCallable();
    }

    get inverse(): CallableLoggerBuilder {
        this.func = this.func.inverse;
        this.styleAppliedExplicitly = true;
        return this._makeCallable();
    }

    get hidden(): CallableLoggerBuilder {
        this.func = this.func.hidden;
        this.styleAppliedExplicitly = true;
        return this._makeCallable();
    }

    get strikethrough(): CallableLoggerBuilder {
        this.func = this.func.strikethrough;
        this.styleAppliedExplicitly = true;
        return this._makeCallable();
    }

    get reset(): CallableLoggerBuilder {
        this.func = this.func.reset;
        this.styleAppliedExplicitly = true;
        return this._makeCallable();
    }

    // --- Log Output Methods ---

    /**
     * 
     * @param message 
     */

    pt(message: any): void {
        if (Array.isArray(message) || this._isPlainObjectArray(message)) {
            console.table(message);
        } else {
            console.log(message)
        }
    }

    print(message: any): void {
        if (Array.isArray(message) || this._isPlainObjectArray(message)) {
            console.table(message);
        } else {
            console.log(message)
        }
    }
    /**
     * 
     * @param message 
     * @returns 
     */
    info(message: any): LoggerBuilder {
        let logFunc: ChalkInstance;

        if (this.styleAppliedExplicitly) {
            logFunc = this.func;
        } else {
            logFunc = chalk.blue;
        }

        clog.label('info').log(logFunc, message)
        this.resetState();
        return this;
    }

    success(message: any): LoggerBuilder {
        let logFunc: ChalkInstance;

        if (this.styleAppliedExplicitly) {
            logFunc = this.func;
        } else {
            logFunc = chalk.green;
        }

        clog.label('success').timeStamp('long').log(logFunc, message)
        this.resetState();
        return this;
    }

    warn(message: any): LoggerBuilder {
        let logFunc: ChalkInstance;

        if (this.styleAppliedExplicitly) {
            logFunc = this.func;
        } else {
            logFunc = chalk.yellow;
        }

        clog.label('warn').error(logFunc, message)
        this.resetState();
        return this;
    }

    error(message: any): LoggerBuilder {
        let logFunc: ChalkInstance;

        if (this.styleAppliedExplicitly) {
            logFunc = this.func;
        } else {
            logFunc = chalk.red;
        }

        clog.label('error').error(logFunc, message)
        this.resetState();
        return this;
    }


    /**
     * 
     * @param message 
     * @returns 
     */

    private default(message: any): LoggerBuilder {
        clog.log(this.func, message)
        this.resetState();
        return this;
    }

    private resetState(): void {
        this.func = chalk;
        this.styleAppliedExplicitly = false;
    }

    private _isPlainObjectArray(value: any): boolean {
        return Array.isArray(value) && value.every(item => typeof item === 'object');
    }
}

export default LoggerBuilder;