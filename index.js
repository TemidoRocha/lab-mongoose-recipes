const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data'); // Import of the data from './data.json'

const MONGODB_URI = 'mongodb://localhost/recipeApp';

// Connection to the database "recipeApp"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database && erasing all the database at the beginning`);
    // Run your code here, after you have insured that the connection was made
    return self.connection.dropDatabase();
  })
  .then(() => {
    return Recipe.create({
      title: 'Lasagna',
      level: 'Easy Peasy',
      ingredients: ['pasta', 'meat', 'cheese', 'cream', 'tomato sauce'],
      cuisine: 'Italian',
      dishType: 'Dish',
      duration: 45,
      creator: 'Luca'
    });
  })
  .then(recipeFile => {
    return Recipe.find({ title: 'Lasagna' });
  })
  .then(lasagna => {
    console.log(lasagna);
    return Recipe.insertMany(data);
  })
  .then(recipeFile => {
    return Recipe.find({}, { _id: 0, title: 1 });
  })
  .then(recipeFile => {
    return Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
  })
  .then(() => {
    return Recipe.find({ title: 'Rigatoni alla Genovese' });
  })
  .then(recipeFile => {
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(whatComesFromPreviousThen => {
    console.log(whatComesFromPreviousThen);
    return mongoose.disconnect();
  })
  .then(() => {
    console.log('Has disconnected');
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
