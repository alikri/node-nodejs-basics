import fsPromises from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {
    const sourceFolderDir = path.join(__dirname, 'files');
    const copyFolderDir = path.join(__dirname, 'files_copy');
    
    try {

        try {
            await fsPromises.access(copyFolderDir);
            throw new Error('FS operation failed'); 

        } catch (err) {
            if (err.code !== 'ENOENT') {
                throw err; 
            }
        }
        
        try {
            await fsPromises.access(sourceFolderDir);
            
        } catch (err) {
            if (err.code === 'ENOENT') {
                throw new Error('FS operation failed'); 
            }

            throw err; 
        }

        await fsPromises.mkdir(copyFolderDir, { recursive: true });
        const sourceFiles = await fsPromises.readdir(sourceFolderDir);

        for (const file of sourceFiles) {
            const sourceFile = path.join(sourceFolderDir, file);
            const finalFile = path.join(copyFolderDir, file);

            await fsPromises.copyFile(sourceFile, finalFile);
        }

        console.log('Directory copied');

    } catch (err) {
            throw err;
    }
};

await copy();
