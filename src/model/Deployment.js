const mongoose = require('mongoose');

const DeploymentSchema = new mongoose.Schema({
    URL: String,
    templateName: {
        type: String,
        required: true
    },
    version: {
        type: [String],
        required: true
        
    },
    deployed: {
        type: Date, default: new Date
    }
});

module.exports = mongoose.model('Deployment', DeploymentSchema);