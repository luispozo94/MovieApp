//created schema to check for specific inputs

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
	favorites: { type: String, required: true, unique: true, default: '[]' },
});

module.exports = new mongoose.model('movie', movieSchema);
