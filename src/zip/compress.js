import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import zlib from 'zlib';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
    const finalFile = path.join(__dirname, 'files/archive.gz');
    const sourceFile = path.join(__dirname, 'files/fileToCompress.txt');

    try {
        await fsPromises.access(sourceFile);
        const readableStream = fs.createReadStream(sourceFile);
        const writableStream = fs.createWriteStream(finalFile);

        const gZip = zlib.createGzip();

        await pipeline(
            readableStream,
            gZip,
            writableStream
        );
        
        fs.unlinkSync(sourceFile);
        console.log('All went well, file compressed');

    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log('File has been compressed already!')
        } else {
            throw err;
        }
    }
};

await compress();
