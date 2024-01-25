import path from 'path';
import fs from 'fs';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
    const finalFile = path.join(__dirname, 'files/archive.gz');
    const sourceFile = path.join(__dirname, 'files/fileToCompress.txt');

    const readableStream = fs.createReadStream(sourceFile);
    const writableStream = fs.createWriteStream(finalFile);

    const gZip = zlib.createGzip();
    readableStream.pipe(gZip).pipe(writableStream);

    writableStream.on('finish', () => {
    console.log('All went well, file compressed')
    });

    writableStream.on('error', (err) => {
        console.log('Something went wrong:', err)
    })

};

await compress();
