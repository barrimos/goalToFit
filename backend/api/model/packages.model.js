const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packageSchema = new Schema({
},{
    timestamps: true,
})

const PackagesSets = mongoose.model('packages', packageSchema);
module.exports = PackagesSets;