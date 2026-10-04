const path = require('path');

const runner = path.relative(process.cwd(), path.join(__dirname, 'run-section1-positive.js'));
console.log('Run Section 1 positive scenarios through Playwright MCP:');
console.log('');
console.log('  Tool: browser_run_code_unsafe');
console.log(`  filename: ${runner.replace(/\\/g, '/')}`);
console.log('');
console.log('All browser steps are executed by the MCP server against a live browser session.');
