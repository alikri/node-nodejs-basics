const parseArgs = () => {
    const cliArgs = Object.values(process.argv);
    const pairs = [];
    for (let i = 2; i < cliArgs.length - 1; i+=2) {
        let key = cliArgs[i];
        let value = cliArgs[i + 1];
        pairs.push(`${key} is ${value}`);
    }
    const finalPairs = pairs.join(', ');
    console.log(finalPairs);
};

parseArgs();