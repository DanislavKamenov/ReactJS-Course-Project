# Forum

This project is a basic single page forum application built with Express and React. 
Its core features include: 
- user creation;
- user roles(basic and administrator);
- content generation in the form of categories, posts and comments;
- private messaging between users;
- moderation features including: category access restriction, user bans and complete removal of users.

The goal of the project is to show the core concepts of building an application with React. In this project I've used:

- Regular React Components;
- Higher Order Components;
- React state;
- Observer for managing login, logout and notification state;
- Custom services with helper functions.

### Prerequisites

- MongoDB.
If you do not have MongoDB installed on your machine follow the instructions on this link: https://www.mongodb.com/ to set it up.

### Installing

Setting up the application to run on your local machine is very easy.

1. Clone the repository.
2. Run 'npm install' inside the 'server' directory to intall all rest server dependencies.
3. Run 'npm install inside the 'client' directory to install all React dependencies.
4. Run the 'start-mongodb' bat file to get an instance of the database.
5. Run 'node server.js' inside the 'server' directory to start the rest server.
6. Run 'npm start' inside the 'client' directory to start the React server.
7. Have fun messing around with the development build.

## Built With

* [React](https://reactjs.org/docs/getting-started.html) - JavaScript Front-End Framework
* [Recompose](https://www.npmjs.com/package/recompose) - Library for HOC composition
* [Express](https://expressjs.com/en/starter/installing.html) - JavaScript Web Framework
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Library for creating and parsing JSON Web Tokens
* [Mongoose](http://mongoosejs.com/) - ORM Framework
* [NPM](https://www.npmjs.com/) - Node Package Manager

## Authors

* **Danislav Kamenov** - [DanislavKamenov](https://github.com/DanislavKamenov/)

## License

This project is licensed under the MIT License

