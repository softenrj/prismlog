# Prismlog

Prismlog is a beautiful, structured, and colorful logger for Node.js applications. It provides an expressive and flexible API to log messages with various colors, styles, and structured formats.

## Features

- Built-in support for colorful and styled console logs using Chalk
- Fluent API with chaining for colors, background colors, and styles
- Automatic detection and pretty printing of arrays and objects, including table-like display using `console.table`

- Labels and timestamps for structured logging
- Configurable logging levels and themes

## Installation

```bash
npm install prismlog
```

## Usage

Import the logger and use its fluent API:

```typescript
import logger from 'prismlog';

logger.color('magenta').info('This message is magenta!');
logger.success('Operation completed successfully!');
logger.warn('This is a warning message.');
logger.error('An error occurred!');

// Log an array or array of objects to display as a table
const tableData = [
  { Name: 'Alice', Age: 30, City: 'New York' },
  { Name: 'Bob', Age: 25, City: 'Los Angeles' },
];
logger.info(tableData);
```

The logger automatically detects if the message is an array or an array of plain objects and uses `console.table` to display it in a structured table format.

## Development

Clone the repository and install dependencies:

```bash
npm install
```

Run the demo:

```bash
ts-node src/example/demo.ts
```

## Acknowledgements

Special thanks to the [Chalk](https://www.npmjs.com/package/chalk) package for providing the colorful and styled console output capabilities that Prismlog leverages.

## Author

Raj Sharma  
Email: rjsharmase@gmail.com  
GitHub: [https://github.com/rjsharma/prismlog](https://github.com/rjsharma/prismlog)

## License

MIT License
