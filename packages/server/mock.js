

const data = [{
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

function createBooksMock() {
	data.map((book) => {
    let bookAuthor = db.authors.findOne({
      name: book.author.name,
      age: book.author.age,
    });

    if(bookAuthor === null) {
      db.authors.insert({
        name: book.author.name,
        age: book.author.age,
      });
      bookAuthor = db.authors.findOne({
        name: book.author.name,
        age: book.author.age,
      });
    }

		db.books.insert({
      title: book.title,
      author: bookAuthor._id,
    });

		const newBook = db.books.findOne({
      title: book.title,
      author: bookAuthor._id,
    });

    db.authors.updateOne({
      _id: bookAuthor._id
    }, {
      $addToSet: {
        books: newBook._id
      }
    });
	});
}


createBooksMock();
