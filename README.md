
<div align="center">
  <h3 align="center">Kavin Bacon Degree</h3>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>


</br>
<!-- ABOUT THE PROJECT -->
## About The Kavin Bacon Demo Project
</br>
</br>

- This demo project is based on the IMDB.com API to find all movies / actors Kevin Bacon has been associated to store this data locally.
- Recursively, 2 deep (configurable) store all the movies / actors they’ve been
associated with.
- Answer how many degrees away any actor name is from Kevin Bacon.

### Built With

I used NodeJS (v16.15.0) version and NPM (8.5.5) version.[![NodeJS][NodeJS.js]][NodeJS-url]

</br>

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app.

1. Get a free API Key at [https://rapidapi.com/](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/AmandeepBIT/Kevin-Bacon-Degree.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Create/Update .env file as per requirement.Enter your API details or you can test with my keys also

5. Run the server
    ```sh
   npm run start:dev (if nodemon already installed in the system)
   OR
   npm run start
   ```

  </br>
  </br>

### Run Tests and Check Eslint
To check the test cases and eslint coding structure then follow the below commands.
   ```sh
   npx mocha --timeout 10000 server/test-cases/task.js
   npm run lint
   ```
  </br>

### Demo Video Link - > 
https://drive.google.com/drive/folders/1hyaEyDdOTGaCIGeKAlj7T31SAtjsJwOD?usp=sharing
### Postman Collection Link - > 
https://drive.google.com/drive/folders/1hyaEyDdOTGaCIGeKAlj7T31SAtjsJwOD?usp=sharing

## Project Structure

- Node JS server points out (entry point) to package.json and look for index.js file. In which server has been setup for small demo project without security, cors and clusters etc.
- Server folder contains all the routers, controllers and utils
- Server / Assets folder contains the local files to save the movies and actors data.
- Server / Controller contains the business logics and handles the request and responses.
- Server / Routes handles the routing of all the API endpoints
- Server / Schema contains the schemas to handle the required fields and perform according that
- Server / test-cases contains the test cases to test the logics for all the apis
- Server / utils handles the generic funcitons, services.

<!-- MARKDOWN LINKS & IMAGES -->

[NodeJS.js]: https://nodejs.org/static/images/logo.svg
[NodeJS-url]: https://nodejs.org/en/
