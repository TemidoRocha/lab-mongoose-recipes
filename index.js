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
  .then(() => {
    console.log(`Connected to the database`);
    // Run your code here, after you have insured that the connection was made
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
