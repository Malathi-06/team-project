const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const modelsDir = path.join(__dirname, '../models');

console.log('Verifying Mongoose Models...');

fs.readdirSync(modelsDir).forEach(file => {
    if (file.endsWith('.js')) {
        try {
            const modelName = file.replace('.js', '');
            require(path.join(modelsDir, file));
            console.log(`✅ Loaded model: ${modelName}`);
        } catch (error) {
            console.error(`❌ Error loading model: ${file}`);
            console.error(error);
            process.exit(1);
        }
    }
});

console.log('All models loaded successfully!');
process.exit(0);
