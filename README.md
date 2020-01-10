# ARROW MONO REPO

This repo contains both a frontend application (create-react-app) and a backend application (node.js).

### Getting Started: running locally

- Clone the repo
- To run the frontend...
- In one terminal, cd into `archer-jordan-ui`
- run `yarn install` (to install all the packages for the frontend app)
- Make sure you have a .env file in your `archer-jordan-ui` folder (see `archer-jordan-ui/.env.example`)
- Once packages are installed and env variables are setup, you can run `yarn start` to start the create-react-app
- You should now have a frontend app (but it wont do much until you have a backend URL to hit)
- To run the backend....
- In another terminal, cd into `arrow-backend`
- run `yarn install` to install the packages for the backend
- Make sure you have a .env file in your `arrow-backend` folder (see `arrow-backend/.env.example`)
- Once packages are installed and env variables are setup, you can run `yarn local` to start the node.js application
- Your backend will run on `http://localhost:8080/graphql` (this should match your frontend .env file)
- You should now see your frontend app is working/hitting an API

### Working Locally & Deployment

All local work should happen on the staging branch (or branches off of the staging branch). When you're ready to push changes from staging to production, do the following

- push your local staging changes to the remote github branch
- this will kick off netlify to rebuild the staging website automatically
- next, run `yarn deploy` from the top level folder `arrow` (you should be on your staging branch chcked out locally)
- this will push your code to the "staging" backend server
- you can now test the staging frontend (hosted on netfliy) pointing at the staging server (heroku)

If all looks well, and you want to push changes to production, do the following

- Open up github, heroku and netlify in different tabs before you start and make sure you're logged in
- Go to github and merge staging branch into master
- This will kickoff netlify to automatically update the production site with the new frontend code
- Hopefully you have heroku open, go to the arrow-api pipeline and you'll see a "promote to production" button under the `arrow-api-staging` app. Just click that button and it'll update the production server to use whatever is currently on staging (but it will use production environment variables).

That's it. You just tested changes on staging and then updated the production site with them
