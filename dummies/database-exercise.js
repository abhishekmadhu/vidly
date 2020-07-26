const mongoose = require('mongoose');

// This should come from a config file
// URI/databaseName
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Schema that defines the shape of data in a document
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tag: [ String ],
    date: { type: Date, default: Date.now },
    price: Number,
    isPublished: Boolean
})

// get a Course class model using the collection name and schema
const Course = mongoose.model('Course', courseSchema, collection='courses');


async function getCourses() {
    const courses = await Course
        .find({ isPublished: true })
        .sort({ name: 1 })
        .select({ name: 1, author: 1 });

    return courses;
}

async function run(){
    const courses = await getCourses();
    console.log(courses);
    // console.log('courses retrieved!');
}

run()


