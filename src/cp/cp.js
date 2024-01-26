import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const spawnChildProcess = async (args) => {
    const targetFile = path.join(__dirname, 'files/script.js');
    const childProcess = spawn('node', [targetFile, ...args], {
        stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
    });

    childProcess.on('exit', (code) => {
        console.log(`Exited with code: ${code}`);
    })
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['verifyArg1', 'verifyArg2', 'verifyArg3']);
