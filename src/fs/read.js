import fsPromises from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
    const fileToRead = path.join(__dirname, 'files/fileToRead.txt');

    try {
        await fsPromises.access(fileToRead);
        const fileContent = await fsPromises.readFile(fileToRead, 'utf-8');
        console.log(fileContent);

    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw err;
        }
    }
};

await read();
