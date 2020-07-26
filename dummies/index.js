const mongoose = require('mongoose');

// This should come from a config file
// URI/databaseName
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB', err));


// Schema that defines the shape of data in a document
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tag: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
})

// get a Course class model using the collection name and schema
const Course = mongoose.model('Course', courseSchema);

// async function createCourse() {
//     const course = new Course({
//         name: 'Python Course',
//         author: 'Abhishek',
//         tag: ['python', 'backend'],
//         isPublished: true
//     })
    
//     // This is ASYNC!!
//     const result = await course.save();
    
//     console.log(result);
// }

// createCourse();

async function getCourses() {
    const courses = await Course
        .find({ isPublished: true })
        .limit(10)
        .sort({ name: 1 })
        .select({ name:1, tags:1 });
        
    console.log(courses);
}

getCourses();
