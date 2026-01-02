// dev.js
const { execSync } = require('child_process');

try {
  execSync('next dev', {
    stdio: 'inherit',
    env: {
      ...process.env,
      TURBOPACK: '0',
      NEXT_PRIVATE_TURBOPACK: '0',
    }
  });
} catch (error) {
  process.exit(error.status);
}