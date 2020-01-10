const fs = require('fs');

function minify(env) {
    const json = fs.readFileSync(`${__dirname}/../private/environment/${env}.json`, 'utf-8').replace(/\s+/g, '').replace(/\r?\n/g, '');
    fs.writeFileSync(`${__dirname}/../private/environment/minify/${env}.json`, json);
}

minify('development');