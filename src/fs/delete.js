import fsPromises from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const remove = async () => {
    const fileToRemove = path.join(__dirname, 'files/fileToRemove.txt');
    try {
        await fsPromises.access(fileToRemove);
        await fsPromises.rm(fileToRemove);
        console.log('File removed');
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw err;
        }
    }
};

await remove();