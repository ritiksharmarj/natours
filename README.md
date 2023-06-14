<h1 align="center">
  <br>
  <a href="https://natours-adventure.vercel.app/"><img src="https://github.com/ritiksharmarj/natours/assets/54701022/326dd79a-8751-4d1d-883f-b302cf0461c5" alt="Natours" width="200"></a>
  <br>
  Natours
  <br>
</h1>

<h4 align="center">An awesome tour booking site built on top of <a href="https://nodejs.org/en/" target="_blank">NodeJS</a>.</h4>

 <p align="center">
 <a href="#deployed-version">Demo</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#demonstration">Demonstration</a> •
  <a href="#update-your-profile">Update your profile</a> •
  <a href="#api-usage">API Usage</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#build-with">Build With</a> •
  <a href="#to-do">To-do</a> •
  <a href="#installation">Installation</a> • 
  <a href="#known-bugs">Known Bugs</a> • 
  <a href="#future-updates">Future Updates</a> • 
  <a href="#acknowledgement">Acknowledgement</a>
</p>

## Deployed Version

Live demo (Feel free to visit) 👉 : https://natours-adventure.vercel.app/

## Key Features

- Authentication and Authorization
  - Login and logout
- Tour
  - Manage booking, check tours map, check users' reviews and rating
- User profile
  - Update username, photo, email, and password

## Demonstration

#### Home Page :

![natoursHomePageonline-video-cutt](https://user-images.githubusercontent.com/58518192/72606801-7ebe0680-3949-11ea-8e88-613f022a64e5.gif)

#### Tour Details :

![tourOverviewonline-video-cutterc](https://user-images.githubusercontent.com/58518192/72606859-a0b78900-3949-11ea-8f0d-ef44c789957b.gif)

#### User Profile :

![rsz_userprofile](https://user-images.githubusercontent.com/58518192/72607635-44edff80-394b-11ea-8943-64c48f6f19aa.png)

#### Admin Profile :

![rsz_adminprofile](https://user-images.githubusercontent.com/58518192/72607648-4d463a80-394b-11ea-972f-a73160cfaa5b.png)

## Update your profile

- You can update your own username, profile photo, email and password.

## API Usage

Before using the API, you need to set the variables in Postman depending on your environment (development or production). Simply add:

```
- {{URL}} with your hostname as value (Eg. http://127.0.0.1:8000 or http://www.example.com)
- {{password}} with your user password as value.
```

Check [Natours API Documentation](https://documenter.getpostman.com/view/8689170/SVmzvwpY?version=latest) for more info.

<b> API Features: </b>

Tours List 👉 https://natours-adventure.vercel.app/api/v1/tours

Tours State 👉 https://natours-adventure.vercel.app/api/v1/tours/tour-stats

Get Top 5 Cheap Tours 👉 https://natours-adventure.vercel.app/api/v1/tours/top-5-cheap

Get Tours Within Radius 👉 https://natours-adventure.vercel.app/api/v1/tours/tours-within/200/center/34.098453,-118.096327/unit/mi

## Deployment

The website is deployed with git into vercel. Below are the steps taken:

```
git init
git add -A
git commit -m "Commit message"
git push origin main
npm i -g vercel
vercel
vercel --prod
Set environment to vercel, go to project > project settings > environment variables
```

You can also change your website url by:

```
go to project > project settings > domains
```

## Build With

- [NodeJS](https://nodejs.org/en/) - JS runtime environment
- [Express](http://expressjs.com/) - The web framework used
- [Mongoose](https://mongoosejs.com/) - Object Data Modelling (ODM) library
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database service
- [Pug](https://pugjs.org/api/getting-started.html) - High performance template engine
- [JSON Web Token](https://jwt.io/) - Security token
- [ParcelJS](https://parceljs.org/) - Blazing fast, zero configuration web application bundler
- [Stripe](https://stripe.com/) - Online payment API
- [Postman](https://www.getpostman.com/) - API testing
- [Mailtrap](https://mailtrap.io/) - Email delivery platform
- [Vercel](https://vercel.com/) - Cloud platform

## To-do

- Bookings payments
  - Allow user to book a tour and pay using credit card and manage bookings
- Review and rating
  - Allow user to add a review directly at the website after they have taken a tour
- Booking
  - Prevent duplicate bookings after user has booked that exact tour, implement favourite tours
- Advanced authentication features
  - Signup, confirm user email, login with refresh token, two-factor authentication
- And More ! There's always room for improvement!

## Installation

You can fork the app or you can git-clone the app into your local machine. Once done that, please install all the
dependencies by running

```
$ npm i
set your env variables
$ npm run watch
$ npm run build
$ npm run dev (for development)
$ npm run prod (for production)
$ npm run debug (for debug)
$ npm start
```

## Known Bugs

Feel free to create an issue for bugs or features if you run into any issues or have questions, ideas or concerns.
Please enjoy and feel free to share your opinion, constructive criticism, or comments about my work. Thank you! 🙂

## Future Updates

- Enable credit card payment
- Improve overall UX/UI and fix bugs
- Featured Tours
- Recently Viewed Tours
- And More ! There's always room for improvement!

## Acknowledgement

- This project is part of the online course I've taken at Udemy. Thanks to [Jonas Schmedtmann](https://twitter.com/jonasschmedtman) for creating this awesome course!
