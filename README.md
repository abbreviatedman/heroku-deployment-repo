# Deploying To Heroku Guide for 8.0

## Setup And Tour

### Initial Setup

- Fork this repo on GitHub.
- In your terminal, make sure you're not already in a Git repo. (`git status` should fail with a "fatal" message.)
- Clone down and `cd` into this repository.
- Run `npm install`.
- Use your editor of choice to open the contents of this directory.
- Create a `.env` file with the contents `PORT=3003`.

### Changes In `package.json`

Open the `package.json` and make the following two changes. **Don't forget to follow the JSON format, including double quotes and no trailing commas.** Your editor will likely tell you with some underlining if you've done something off!

#### Scripts

We need two different "run my server" scripts in our `scripts` object.

- `start` should be set to `node server.js`. Heroku will run this script automatically, and it does NOT need any of our dev tooling, like restarting our code when changes are made. So just running our server using `node` is all we want here!
- `dev` should be set to `nodemon server.js`, or whatever command you want to use to run your server with all your dev tools.

Your `scripts` object should look like this:

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "node server.js",
  "dev": "nodemon server.js"
},
```

#### Engines

Add an `engines` object that holds the version of Node that you're running. You can get your version number by running `node --version` on the command line. **Do not add the `v` that Node prints out for you!**

In a team app, you'll decide on some minimum version of Node that everyone can work with without missing any features you know you need. (If you don't know of any you'll need, then you don't need to upgrade!)

Your `engines` object should look something like this:

```json
"engines": {
  "node": "17.3.0"
},
```

### Check Out `server.js` If You Like

Know what you're deploying! It's not too complex, but might be a bit different. It's always good to see alternate ways to write code and learn from them!

Note the following deployment-focused change: there's an `|| 3000` at the end of our `PORT` assignment. This ensures that if there's no config variable in our deployment, express will still have a port to run on, rather than trying to listen on `undefined`.

## Testing Before You Deploy

### Run Your Server

First, run `npm start` to make sure it works. It should run `node server.js`. This command is what will run on your deployed server.

But it doesn't run it with our dev tools, like `nodemon`, so exit out of that command (Ctrl-C) and try `npm run dev`. It should run `nodemon server.js` if you set it up as we did.

Note that for built-in scripts like `start` and `test`, we just need to write `npm start` or `npm test`, but for our own custom scripts, we'll run `npm run [name of script]`.

### Test Your Local Routes

**This is incredibly important.** If you don't know that your routes are working locally, then you won't have an isolated problem if your deployment doesn't work. Was it the deployment process or your code? Check your code _first_.

Make sure you're running `npm run dev`, and that no error came up in your terminal.

Then launch Postman (or your endpoint tester of choice). Test out `localhost:3003` (or whatever your port is) at the following endpoints:

- `GET /` should give you a "Hello" message.
- `GET /dinos` should give you an array of dinosaurs.
- `/dinos/2` should give you a specific dinosaur.
- `GET /dinos/200` and `GET /banana-split` should each give you a 404 and a "Resource not found." error.

## Deployment

### Set Up A Heroku Account

You only have to do this step once! (Unless you want multiple accounts to separate your Heroku projects in some way.)

Go to http://www.heroku.com and sign up. This will include checking your email for a confirmation link, which will lead to picking a password. Choose a good password you'll remember, or write it down, or, best of all, use a password manager. I recommend the free [Bitwarden!](https://bitwarden.com/)

### Log In To Heroku

You only have to do this step once per dev machine!

#### Install The Heroku CLI

Run `npm install --global heroku` in your terminal, or look at alternate ways if you prefer.

This could take a while.

#### Log In On Your Machine

Run `heroku login` in your terminal. Follow the directions to log in using your browser. Once you've logged in, the terminal will update, telling you you've logged in.

### Set Up Deployment For This Repo

#### Create The Heroku Project

You'll only have to do this step when deploying a project for the first time.

Run `heroku create [some name]` on the command line. Make sure it doesn't say the name is already taken! (If so, pick a new name.) If you leave off the name, it will give you a random name, which are never taken and are fun, but can be a challenge to type and remember.

If you run `git remote -v` in your terminal, you should now see not just the push/fetch pair `origin` (your GitHub repo URL), but a pair for `heroku` as well. These are your deployment URLs.

#### Deploy It!

Add and commit if you've made any changes, then run `git push heroku main`.

**Note that we don't use the -u flag here.** Why not? Well, we want `git push` to push to our GitHub repo without having to type in `git push origin main` all the time. But we do not want the default `git push` to go to Heroku. You'll push to GitHub a lot more often than you'll deploy, and you REALLY don't want to accidentally deploy to production.

## Testing The Deployment

`heroku open` will take you to the site and display your "Hello" message. Just a nice quick sanity check, and very useful should you want to deploy your front end on Heroku.

Now make the same Postman requests as above, but instead of using `localhost:3003`, hit up those endpoints on your deployment URL!

## Deploying In The Future

...is easy as pie!

Just add and commit as you normally would, and run `git push heroku main` to redeploy.

That's it! Most of the steps are setup.

## Happy Hacking!

And reach out with technical issues.
