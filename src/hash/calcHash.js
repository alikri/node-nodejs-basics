import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
    const fileToRead = path.join(__dirname, 'files/fileToCalculateHashFor.txt');

    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(fileToRead);

    stream.on('data', (chunk) => {
        hash.update(chunk);
    });

    stream.on('end', () => {
        const fileHash = hash.digest('hex');
        console.log(fileHash);
    })


};

await calculateHash();