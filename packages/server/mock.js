import { Book } from './src/model';
import { connectDatabase } from './src/database';

const books = [{
  "title": "Harry Potter and the Half-Blood Prince",
  "author": {
    "name": "J.K. Rowling",
    "age": 53
  }
},
{
  "title": "Harry Potter and the Goblet of Fire",
  "author": {
    "name": "J.K. Rowling",
    "age": 53
  }
},
{
  "title": "Harry Potter and the Prisoner of Azkaban",
  "author": {
    "name": "J.K. Rowling",
    "age": 53
  }
},
{
  "title": "Harry Potter and the Chamber of Secrets",
  "author": {
    "name": "J.K. Rowling",
    "age": 53
  }
},
{
  "title": "Harry Potter and the Philosopher's Stone",
  "author": {
    "name": "J.K. Rowling",
    "age": 53
  }
},
{
  "title": "The Name of the Wind",
  "author": {
    "name": "Patrick Rothfuss",
    "age": 46
  }
},
{
  "title": "The Wise Man's Fear",
  "author": {
    "name": "Patrick Rothfuss",
    "age": 46
  }
},
{
  "title": "The Slow Regard of Silent Things",
  "author": {
    "name": "Patrick Rothfuss",
    "age": 46
  }
},
{
  "title": "The Handmaid's Tale",
  "author": {
    "name": "Margaret Atwood",
    "age": 80
  }
},
{
  "title": "The Robbit",
  "author": {
    "name": "J.R.R. Tolkien",
    "age": 81
  }
},
{
  "title": "The Lord of the Rings",
  "author": {
    "name": "J.R.R. Tolkien",
    "age": 81
  }
}];

async function createBooksMock() {
	connectDatabase();
	const addBooks = books.map(async(book) => {
		const newBook = await new Book(book);
		await newBook.save();
	});

	return addBooks;
}

createBooksMock();
