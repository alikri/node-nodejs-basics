import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const write = async () => {
    const targetFile = path.join(__dirname, 'files/fileToWrite.txt');
    const writableStream = fs.createWriteStream(targetFile);
    
    process.stdin.pipe(writableStream);

};

await write();
