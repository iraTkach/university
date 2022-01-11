const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// 'Schema' maps to a mongoDB collection and defines the shape of the documents within that collection.
// 'Schema' is the blueprint of the documents.
const studSchema = new Schema({
    name: {type: String},//, required: true},
    faculty: {type: String},//, required: true},
    birthday: {type: Date}//, required: true}

})

// 'model' is a class which we construct document in a collection
module.exports = mongoose.model('students', studSchema);

// The first argument is the singular name of the collection that will be created for the model: 
// mongoose will create the database collection for the model car.

// The second argument is the Schema to use in creating the model.