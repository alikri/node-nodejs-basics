import fsPromises from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const list = async () => {
    const targetDir = path.join(__dirname, 'files');
    try {
        await fsPromises.access(targetDir);
        const filesNames = await fsPromises.readdir(targetDir);
        console.log(filesNames);

    } catch (err) {
          if (err.code === 'ENOENT') {
            throw new Error('FS operation failed');
          } else {
            throw err;
          }
    }
};

await list();
