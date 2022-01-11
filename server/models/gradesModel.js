const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// 'Schema' maps to a mongoDB collection and defines the shape of the documents within that collection.
// 'Schema' is the blueprint of the documents.

const gradSchema = new Schema({
    student_id:  {type: ObjectId, required: true}, // by-default is not required(false).
    grade: {type: Number, required: true},
    subject: {type: String, required: true},
    date: {type: Date, required: true}

})


// 'model' is a class which we construct document in a collection
module.exports = mongoose.model('grades', gradSchema);

// The first argument is the singular name of the collection that will be created for the model: 
// mongoose will create the database collection for the model car.

// The second argument is the Schema to use in creating the model.