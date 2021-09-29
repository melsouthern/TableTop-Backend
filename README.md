# Board Game API

## API Link

To access the Board Game API, visit `https://mels-board-games-api.herokuapp.com/api`

## API Description

This API is centred around board games and based on the requests provided (GET, PATCH, POST, DELETE), this API will respond with various data in an array format, such as game category data, review data, comment data and user data.

This API has been developed with the following:

- `JavaScript`
- `Node.js`
- `PostgreSQL`
- `Nodemon`
- `SQL`
- `Express`
- `Dotenv`
- `Jest`
- `Supertest`
- `Heroku`

---

## API Setup

If you would like to check out the repository and have a look around, follow the below steps. Please note, the following versions are recommended for running the project to ensure it runs as smoothly as possible:

- `Node.js:` v14.17.0
- `PostgreSQL:` 13.3

1. Firstly, you will need to `fork` the repository from board-games-api to your personal GitHub account. To do this, open the GitHub repository at `https://github.com/melsouthern/board-games-api` and click on the 'Fork' button on the top right hand corner of the repository. From here you can select your personal account where the repository will be accessible.

2. Once the repository has been forked, you will need to `clone` this repository down to your local machine. To do this, make sure you are on the newly forked personal repository `yourUsername/board-games-api`, click on the 'Code' button and copy the link provided. From here, open up your IDE and use `git clone` in your command line alongside the provided weblink given to clone the repository to your machine.

3. Now you have cloned and opened the repository, you will need to download the `development dependencies` to ensure that the environment is setup correctly. To do this, enter `npm install` into your command line.

4. You will now need to set up your `.env files`. In the root, create two files:

- .env.development - in this file, you need to write: PGDATABASE=nc_games
- .env.test - in this file, you need to write: PGDATABASE=nc_games_test

These files should sit in a .gitignore file. The purpose of these files are to set up the dev environment based on whether the test data is needed or the actual data is needed.

5. To setup the seeding, you will need to do the following:

- `npm run setup-dbs` - this will setup the databases
- `npm run seed` - this will seed the development data, but not the test data
- `npm test` - This action is used for testing the functionality by using the test database. Whenever this action is run, the databases will be setup and it will seed the test data. Every time this command is ran, the test data is refreshed.

---

## Endpoint Summary

- `GET /api` - serves up a json representation of all the available endpoints of the api
- `GET /api/categories` - serves an array of all board game categories
- `GET /api/reviews` - serves an array of all reviews for the board games
- `GET /api/reviews/:review_id` - responds with the specific review associated with the provided review_id and can be used in conjunction with category, sort_by and order queries
- `PATCH /api/reviews/:review_id` - accepts an object in the form { inc_votes: newVote }. If newVote is a positive integer, the votes property in the given review_id will be increased by newVote value. If newVote is a negative integer, the votes property in the given review_id will be decreased by newVote value. The patched object will then be returned in the response
- `GET /api/reviews/:review_id/comments` - responds with an array of comments associated with the provided review_id
- `POST /api/reviews/:review_id/comments` - accepts an object in the form { username: username, body: body } and returns the newly added comment
- `DELETE /api/comments/:comment_id` - deletes the given comment by comment_id
- `GET /api/users` - responds with an array of objects which should each have a username property
- `GET /api/users/:username` - responds with the user object for the relevant username provided
- `PATCH /api/comments/:comment_id` - accepts an object in the form { inc_votes: newVote }. If newVote is a positive integer, the votes property in the given comment_id will be increased by newVote value. If newVote is a negative integer, the votes property in the given comment_id will be decreased by newVote value. The patched object will then be returned

For a more detailed summary of the endpoints, please visit `https://mels-board-games-api.herokuapp.com/api`.
