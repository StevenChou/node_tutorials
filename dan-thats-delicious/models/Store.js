const mongoose = require('mongoose');
// built-in ES6 Promise  (async/await)
mongoose.Promise = global.Promise;
const slug = require('slugs');

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please enter a store name!'
    },
    slug: String,
    description: {
        type: String,
        trim: true
    },
    tag: [String]
});

storeSchema.pre('save', function(next) {
    if (!this.isModified('name')) {
        next(); // skip it
        return; // stop this function from running
    }

    this.slug = slug(this.name);
    // 呼叫 save
    next();
});

module.exports = mongoose.model('Store', storeSchema);
