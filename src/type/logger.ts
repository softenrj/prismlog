/**
 * Represents the available foreground color methods in Chalk.
 */
export type ChalkColor =
    | 'black'
    | 'red'
    | 'green'
    | 'yellow'
    | 'blue'
    | 'magenta'
    | 'cyan'
    | 'white'
    | 'gray'
    | 'grey'
    | 'blackBright'
    | 'redBright'
    | 'greenBright'
    | 'yellowBright'
    | 'blueBright'
    | 'magentaBright'
    | 'cyanBright'
    | 'whiteBright';


export type ChalkBackgroundColor =
    | 'bgBlack'
    | 'bgRed'
    | 'bgGreen'
    | 'bgYellow'
    | 'bgBlue'
    | 'bgMagenta'
    | 'bgCyan'
    | 'bgWhite'
    | 'bgGray'
    | 'bgGrey'
    | 'bgBlackBright'
    | 'bgRedBright'
    | 'bgGreenBright'
    | 'bgYellowBright'
    | 'bgBlueBright'
    | 'bgMagentaBright'
    | 'bgCyanBright'
    | 'bgWhiteBright';

export type ChalkStyle =
    | 'reset'
    | 'bold'
    | 'dim'
    | 'italic'
    | 'underline'
    | 'inverse'
    | 'hidden'
    | 'strikethrough';

export type AllChalkOptions = ChalkColor | ChalkBackgroundColor | ChalkStyle;

/**
 * 
 * Config Type 
 */


export type LogLevel = "silent" | "error" | "warn" | "info" | "debug" | "trace" | "all";

export interface PrismConfig {
    timestamp?: boolean;
    enableEmoji?: boolean;
    logLevel?: LogLevel;
    enableColor?: boolean;
    usePrettyPrint?: boolean;
    showFilePath?: boolean;
    showLineNumber?: boolean;
    labelStyle?: "bracket" | "colon" | "none";
    customLevels?: string[];
    saveToFile?: boolean;
    filePath?: string;
    dateFormat?: string; // e.g., "YYYY-MM-DD HH:mm:ss"
    useIcons?: boolean;
    maxLogSizeKB?: number;
    includeStackTrace?: boolean;
    defaultLabel?: string;
    logToConsole?: boolean;
    theme?: "dark" | "light";
    alignMessages?: boolean;
    showElapsed?: boolean;
    includePid?: boolean;
    includeHostname?: boolean;
    jsonOutput?: boolean;
    prefix?: string;
}

// Default configuration for PrismConfig
export const defaultConfig: PrismConfig = {
    timestamp: true,
    enableEmoji: true,
    logLevel: "info", // Default to info level
    enableColor: true,
    usePrettyPrint: true,
    showFilePath: false,
    showLineNumber: false,
    labelStyle: "bracket",
    logToConsole: true,
    theme: "dark",
    alignMessages: false,
    jsonOutput: false,
    prefix: "",
};