import path from 'path';
import fs from 'fs';
import zlib from 'zlib';
import fsPromises from 'fs/promises';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
    const sourceFile = path.join(__dirname, 'files/archive.gz');
    const targetFile = path.join(__dirname, 'files/fileToCompress.txt');

    try {
        await fsPromises.access(sourceFile);
        const readibleStream = fs.createReadStream(sourceFile);
        const writebleStream = fs.createWriteStream(targetFile);

        const gunZip = zlib.createGunzip();

        await pipeline(
            readibleStream,
            gunZip,
            writebleStream
        )
        fs.unlinkSync(sourceFile);
        console.log('Decompress is successful!');
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('Please compress the file first!')
        } else {
            throw err;
        }
    }
};

await decompress();
