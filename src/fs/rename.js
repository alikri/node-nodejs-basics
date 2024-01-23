import fsPromises from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
    const filesDir = path.join(__dirname, 'files');

    try {
        await fsPromises.access(path.join(filesDir, 'properFilename.md'));
        throw new Error('FS operation failed');
    } catch(err) {
        if (err.code === 'ENOENT') {
            const fileToRename = path.join(filesDir, 'wrongFilename.txt');
            const fileToRenameTo = path.join(filesDir, 'properFilename.md');
            await fsPromises.rename(fileToRename, fileToRenameTo);
            console.log('File renamed');
        } else {
            throw err;
        }
    }
};

await rename();