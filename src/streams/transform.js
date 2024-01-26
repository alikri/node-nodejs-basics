import { Transform } from 'stream';

const transform = async () => {
    const transformStream = new Transform({
        transform(chunk, _, callback) {

            try {
                const transformedData = chunk.toString().split('').reverse().join('');
                callback(null, transformedData)
            } catch (err) {
                callback(err);
            }

        }
    })

    process.stdin.pipe(transformStream).pipe(process.stdout);
};

await transform();
