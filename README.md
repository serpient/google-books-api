![gif](http://g.recordit.co/HzvDCcOXoD.gif)
# Google Books API Project for 8th Light

## Project Requirements
- Create an application that allows you to use the Google Books API to search for books
  - Type in a query and display a list of books matching that query.
  - Each item in the list should include the book's author, title, and publishing company, as well as a picture of the book.
  - From each list item, you should also be able to navigate to more information about the book, but this information does not necessarily need to appear on a page within your application. In other words, this could link out to an external site with more information about that particular book.
- Deploy it somewhere that can be accessible through a web browser

## Additional Project Considerations
- Handle edge cases
- Usability 
- Internal Quality (decoupling, texting, readability)
- Responsive App
- Error Handling
  - When making a query => If success, renders book list. If error, renders error component with error message.
- Edge Cases
  - If query returns no results, component tells user there are no results instead of a blank screen.
  - Only start a query when input is not an empty string
  - clearing query in input box after API call will remove query results ( blank slate )
- Test Units
  - User input is saved properly into component state
  - Input is correctly passed from state into API call
  - Rendering Test Units
    - App loads
    - On query success, renders book list or "no books match your query" component when there are no results
    - On query error, renders error component with correct error message
- Proper README

## Getting Started
Navigate to the google-books-api repo on your local machine:
```
git clone https://github.com/serpient/google-books-api.git
git remote add upstream https://github.com/serpient/google-books-api.git
npm install
npm start
```
## Techstack
This app was built with [Create React App](https://github.com/facebook/create-react-app), SASS (style pre-processor), Jest/Enzyme (testing library), and axios (making API calls).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Deployment To Heroku
```
git push heroku master
heroku open
```
[Create-React-App / Heroku Deployment](https://blog.heroku.com/deploying-react-with-zero-configuration)
[Create-React-App / Heroku Deployment ALT](https://github.com/mars/create-react-app-buildpack)
[Link To Deployed Site](https://quiet-brushlands-15098.herokuapp.com/)