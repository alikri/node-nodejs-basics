import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
    const coresQuantity = os.cpus().length;
    const workersResults = [];
    const defaultNumber = 10;

    for (let i = defaultNumber; i < coresQuantity; i++) {

        const workerData = await new Promise((resolve, reject) => {
            const worker = new Worker(path.join(__dirname, 'worker.js'), {
                workerData: i,
            });
            
            worker.on('message', (data) => {
                resolve({ status: 'resolved', data });
            })

            worker.on('error', (err) => {
                console.error('Worker error:', err);
                reject({ status: 'error', data: null });
            })

        })

        workersResults.push(workerData);
    
    }

    Promise.allSettled(workersResults)
        .then(results => {
            const processedResults = results.map(result => result.status === 'fulfilled' ?
                { status: 'resolved', data: result.value.data } :
                { status: 'error', data: null }
            );
            
            console.log(processedResults);
        }).catch(err => {
            console.error('Something went wrong...', err);
        }) 

};

await performCalculations();