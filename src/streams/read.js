import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
    const fileToRead = path.join(__dirname, 'files/fileToRead.txt');
    const readableStream = fs.createReadStream(fileToRead);

    readableStream.on('data', (chunk) => {
        process.stdout.write(chunk)
    });
};

await read();
