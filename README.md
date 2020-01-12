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
- you can now test the staging frontend (hosted on netfliy) pointing at the staging server (heroku) (https://staging.archerjordan.com/)

If all looks well, and you want to push your staging changes to the production site, do the following

- Open up github, heroku and netlify in different tabs before you start (and make sure you're logged in to each)
- Next, go to github and merge staging branch into master
- This merge will kickoff netlify to automatically deploy the master branch to the production site (only the frontend code)
- Hopefully you have heroku open in another tab, click to the "arrow-api" pipeline and you'll see two apps in the pipeline: `arrow-api-staging` and `arrow-api-production`
- Click a "promote to production" button under the `arrow-api-staging` app. This will update the production server to use whatever is currently on staging (but it will use production environment variables).

That's it. You just tested changes on the staging and then updated the production site with those changes. Congratulations, fam.
