import fsPromises from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
    const fileToRenameTo = path.join(__dirname, 'files/properFilename.md');
    const fileToRenameFrom = path.join(__dirname, 'files/wrongFilename.txt');

    try {
        await fsPromises.access(fileToRenameFrom);

        try {
            await fsPromises.access(fileToRenameTo);
            throw new Error('FS operation failed');

        } catch (err) {
            if (err.code !== 'ENOENT') {
                throw err;
            } else {
                await fsPromises.rename(fileToRenameFrom, fileToRenameTo);
                console.log('File renamed');
            }

        }

    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        } else {
            throw new Error('FS operation failed');
        }
    }
};

await rename();