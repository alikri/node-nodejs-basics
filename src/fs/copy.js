import fsPromises from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {
    const copyFolderName = 'files_copy';
    const copyFolderDir = path.join(__dirname, copyFolderName);
    
    try {
        await fsPromises.access(copyFolderDir);
        throw new Error('FS operation failed');

    } catch (err) {
        if (err.code === 'ENOENT') {
            await fsPromises.mkdir(copyFolderDir, { recursive: true });
            const sourceDir = path.join(__dirname, 'files');
            const sourceFiles = await fsPromises.readdir(sourceDir);

            for (const file of sourceFiles) {
                const sourceFile = path.join(sourceDir, file);
                const finalFile = path.join(copyFolderDir, file);

                await fsPromises.copyFile(sourceFile, finalFile);
            }

            console.log("Directory copied")
        } else {
            throw err;
        }
    }
};

await copy();
