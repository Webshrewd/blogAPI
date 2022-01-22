var mongoose = require('mongoose')
require('dotenv/config')
const PostModel = require('../models/Post');

const testPostData = { title: 'Before all, create posts', description: 'post content' };

const connect = async () => {
    // Connect to db
    mongoose.connect('mongodb+srv://elie:testuser@cluster0.bfhjd.mongodb.net/expressAPI?retryWrites=true&w=majority')
        // mongoose.connect(process.env.DB_CONNECTION)
        .then(() => console.log("DB connected!"))
        .catch(err => console.log(err));

    const validPost = new PostModel(testPostData);
    await validPost.save();
};

const close = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
};

const clear = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
};

module.exports =
{
    connect,
    close,
    clear
}
