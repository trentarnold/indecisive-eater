# indecisive-eater
Indecisive Eater is all about loving food but hating to make decisions! When you first get to the page, make an account providing your street address. From there if you go to the decide for me section it will bring up a random restaurant. Click roll again to find another restaurant. Apply any specific filters you want on the right hand side. On the local restaurants tab, you are able to see a list of local restaurants, and you can favorite them. The favorites tab has an option to pick a random restaurant from your favorites. 


## Screen Shots
![Create Account Modal](/Screenshots/CreateAccount.png?raw=true) ![Welcome Page](/Screenshots/WelcomePage.png?raw=true) 
![Decide For Me](/Screenshots/DecideForMe!.png?raw=true) ![Local Restaurants](/Screenshots/LocalRestaurants.png?raw=true)
## getting started
Clone the repo
`git clone https://github.com/trentarnold/indecisive-eater.git`
`cd my-app`
Install dependencies
`npm install`
`npm start` to run the client side app;
`cd ../server`
`npm install`
Start development server
`npm start`

To start this app you will need to run npm i in both the my-app and the server directories. Follow the individual README.md's in both the client and server directories for information on how to set up your api keys and config/.env files! [Client Readme](/my-app/README.md)[Server Readme](/server/README.md)

### Tech Stack
On the front end this app uses React, Chakra UI (for styling the forms, buttons and modals), and Typescript.
On the back end the server is created with Express. The database is  PostgreSQL. The ORM is Sequelize. Typescript throughout the entire back-end. The database was created using Sequelize CLI, thus the migrations folder.  


