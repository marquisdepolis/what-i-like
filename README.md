# User Product Preferences

User Product Preferences is a web application that allows users to input information about products and links for various categories such as credit cards, banks, tech products, and more. Users can manage their preferences by marking "Things They Like" and "Things They Want". The application features a public feed and individual user pages.

## Features

- User authentication via hello.dev
- Input fields for product information and links
- Categorization of products (12 predefined categories)
- User preference management
- Public feed displaying products
- Individual user pages

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- MySQL

### Installing

1. Clone the repository to your local machine.
```sh
git clone https://github.com/your-username/your-repo.git
```

2. Navigate to the project directory.
```sh
cd user-product-preferences
```

3. Install the dependencies.
```sh
npm install
```

4. Set up the environment variables by creating a `.env` file with the following content:
```
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
HELLO_DEV_CLIENT_ID=your_hello.dev_client_id
HELLO_DEV_OAUTH_PROXY=your_hello.dev_oauth_proxy
JWT_SECRET=your_jwt_secret
```

5. Initialize the database with the provided schema.
```sh
mysql -u your_database_user -p your_database_name < db/schema.sql
```

6. Start the server.
```sh
npm start
```

For development, you can use the following command to run the server with nodemon, which will automatically restart the server upon file changes.
```sh
npm run dev
```

## Usage

Once the server is running, you can access the application in your web browser at `http://localhost:3000`.

- Register a new account or log in using the navigation links.
- Add new products and categorize them.
- View the public feed to see products added by all users.
- Visit individual user pages to see their preferences.

## Built With

- [Express](https://expressjs.com/) - The web framework used
- [MySQL](https://www.mysql.com/) - The database used
- [hello.js](https://adodson.com/hello.js/) - Authentication library for hello.dev
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Library for hashing passwords
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Library for working with JSON Web Tokens

## Contributing

Please read [CONTRIBUTING.md](https://github.com/your-username/your-repo/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

- **Your Name** - *Initial work* - [YourUsername](https://github.com/your-username)

See also the list of [contributors](https://github.com/your-username/your-repo/contributors) who participated in this project.

## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc

