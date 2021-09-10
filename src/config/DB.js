const mongoose = require('mongoose');
module.exports = () => {
    // Database connectivity
    async function main() {
        await mongoose.connect(process.env.DB_URI);
    }

    main().then(() => {
        console.log('Database connected...')
    }).catch(err => console.log(err));
}