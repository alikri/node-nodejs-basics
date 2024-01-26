import { access, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = async () => {
    const text = 'I am fresh and young';
    const fileName = 'fresh.txt';
    const folderPath = path.join(__dirname, 'files');
    const filePath = path.join(folderPath, fileName);
    try {
        await access(filePath);
        throw new Error('FS operation failed');
    } catch (err) {

        if (err.code === 'ENOENT') {
            await writeFile(filePath, text);
            console.log('File successfully created.');
        } else {
            throw err;
        }
    }
};

await create();
