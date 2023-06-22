<h1 align="center">
  <br>
  <a href="https://natours-xbsh.onrender.com/"><img src="https://github.com/ritiksharmarj/natours/assets/54701022/326dd79a-8751-4d1d-883f-b302cf0461c5" alt="Natours" width="200"></a>
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

Live demo (Feel free to visit) 👉 : https://natours-xbsh.onrender.com/

## Key Features

- Authentication and Authorization
  - Signup, Login and logout
- Tour
  - Manage booking, check tours map, check user's reviews and ratings
- User profile
  - Update username, profile photo, email, and password
- Credit card payment using Stripe

## Demonstration

[![Natours Walkthrough](https://img.youtube.com/vi/UljiMtXeFx0/maxresdefault.jpg)](https://www.youtube.com/watch?v=UljiMtXeFx0)

## How To Use

### Book a tour

- Login or Signup to the site
- Search for tours that you want to book
- Book a tour
- Proceed to the payment using Stripe
- Enter the card details (Test Mode):
  ```
  - Card No. : 4242 4242 4242 4242
  - Expiry date: any
  - CVV: any
  ```
- Finished!

### Manage your booking

- Check the tour you have booked in "Manage Booking" page in your user settings. You'll be automatically redirected to this
  page after you have completed the booking.

### Update your profile

- You can update your own username, profile photo, email and password.

## API Usage

Before using the API, you need to set the variables in Postman depending on your environment (development or production). Simply add:

```
- {{URL}} with your hostname as value (e.g. http://127.0.0.1:8000 or http://www.example.com)
- {{password}} with your user password as value.
```

Check [Natours API Documentation](https://documenter.getpostman.com/view/8689170/SVmzvwpY?version=latest) for more info.

<b> API Features: </b>

Tours List 👉 https://natours-xbsh.onrender.com/api/v1/tours

Tours Statistics 👉 https://natours-xbsh.onrender.com/api/v1/tours/tour-stats

Get Top 5 Cheap Tours 👉 https://natours-xbsh.onrender.com/api/v1/tours/top-5-cheap

Get Tours Within Radius 👉 https://natours-xbsh.onrender.com/api/v1/tours/tours-within/200/center/34.098453,-118.096327/unit/mi

## Deployment

The website is deployed using git on render.com. Below are the steps taken:

```
git init
git add -A
git commit -m "Commit message"
git push origin main

deploy on render > web service
```

Set environment variables to render:

```
go to dashboard > project > environment
```

## Build With

- [NodeJS](https://nodejs.org/en/) - JS runtime environment
- [Express](http://expressjs.com/) - The web framework used
- [Mongoose](https://mongoosejs.com/) - Object Data Modelling (ODM) library
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database service
- [Pug](https://pugjs.org/api/getting-started.html) - High performance template engine
- [JSON Web Token](https://jwt.io/) - Security token
- [esbuild](https://esbuild.github.io/) - An extremely fast bundler for the web
- [Stripe](https://stripe.com/) - Online payment API
- [Postman](https://www.getpostman.com/) - API testing
- [Mailtrap](https://mailtrap.io/) & [Mailgun](https://www.mailgun.com/) - Email delivery platform
- [Render](https://render.com/) - Cloud platform

## To-do

- Review and rating
  - Allow user to add a review directly at the website after they have booked a tour
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
$ npm run dev (for development)
$ npm run prod (for production)
$ npm run debug (for debug)
```

## Known Bugs

Feel free to create an issue for bugs or features if you run into any issues or have questions, ideas or concerns.
Please enjoy and feel free to share your opinion, constructive criticism, or comments about my work. Thank you! 🙂

## Future Updates

- Improve overall UX/UI and fix bugs
- Featured Tours
- Recently Viewed Tours
- And More ! There's always room for improvement!

## Acknowledgement

- This project is part of the online course I've taken at Udemy. Thanks to [Jonas Schmedtmann](https://twitter.com/jonasschmedtman) for creating this awesome course!
