# JS Frameworks - Module Assignment 2

# Brief

Create a new app using Create React App.

You can create an app inside the current folder using:

```
npx create-react-app .
```

> If your repo name has a capital letter in it make the folder name all lowercase before running the above command.

---

Level 1 is required.

Level 2 is optional.

You can use a UI library like React Bootstrap or style it all on your own. The styling is not important for this assignment but every frontend project must always be responsive.

## Level 1

You will need to find a URL to make a GET request to. This URL should return an array of results.

This can be any API URL except those used in this module's lessons and lesson tasks. You can use your own API too.

The site should have 2 "pages":

-   Home - route: "/"
-   Contact - route: "/contact"

All pages should make use of a `Heading` component for the `h1` element on the page. This component should have the appropriate Prop Type checks.

#### Home page

Make a request to your API, loop through the results and display at least two properties from each result.

Each result's properties should be passed in to a component separate from the component the API call is in, similar to how the result properties are passed in to the `BookItem` component in lesson 3.

This component should have the appropriate Prop Type checks.

#### Contact page

Create a form with the following inputs and validation rules:

-   Name - required with a minimum of 3 characters
-   Age - required number value with a minimum value of 10 and a maximum value of 20
-   Website - required and must be in a valid URL format

Provide your own validation messages.

---

## Level 2

#### Home page

Link from each item on the home page to a details page, passing a param value in the URL.

Fetch the param from the URL and use it to make a GET request to retrieve a single result.

Display at least 2 properties from the result.
