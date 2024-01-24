const parseEnv = () => {
    const envVariables = Object.entries(process.env)
        .filter(entry => entry[0].includes('RSS_'))
        .map(variable => `${variable[0]}=${variable[1]}`)
        .join('; ');
    console.log(envVariables);
};

parseEnv();