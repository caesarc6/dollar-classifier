# CommonCents

CommonCents is a web application that is intended to be used by individuals who are visually impaired. After researching, my team members and I realized that there isn't many resources for people with visual disabilities, especially when it relates to their finances. We decided to create this application to help these individuals be able to differentiate between the USD currency.

For right now, the application is only able to differentiate between a $50 dollar bill and a $100 dollar bill. We are hoping to incorporate other USD, such as $1, $5, $10 and $20 dollar bills.

## Requirements:

1. React (https://reactjs.org/)
2. Express (https://expressjs.com/)
3. Python (https://www.python.org/)
4. Pipenv (https://pipenv.pypa.io/en/latest/)
5. Teachable machine (https://teachablemachine.withgoogle.com/)

Note: This web application uses machine learning algorithms to be able to differentiate between the different dollar bills. For this we relied heavily on teachable machine to do the heavylifting for us. 

## Installation:

1. Clone the project.
2. `cd` into the `frontend` folder and run `npm install`.
3. `cd` into the `backend` folder and run `npm install`.
4. Make sure you have python and pipenv installed on your machine, this is mandatory to be able to get this project up and running. 
4. `cd` into the `model` folder and run `pipenv install`.

## Running the project:

The web application uses a react frontend, to allow the user to upload a file. Which then passes along the file that was uploaded to the express backend. The backend will pass that file to the trained machine learning model, that is in the model folder. The prediction is then returned to express, which is then returned to react and displayed to the user. 

To run the react app:

1. `cd` into the `frontend` folder.
2. Run `npm start`, this should open up a browser with a url of 'http://localhost:3000'.

To run the express api:

1. `cd` into `backend` folder.
2. Run `npm start`, this should get the server up and running.

To run the flask server:

1. `cd` into `model` folder.
3. Run `flask run`, this is to get the flask server up and running as well. 

Note: Express is used to proxy the request to the flask server, which is where the trained model lives (the app.py file). Please read the comments in the files for a more detailed explanation.

## How to use the web applcation: 

Once the application is up and running, you can upload a file/picture of a $50 or $100 dollar bill and the output will be displayed to the screen. 

Please be aware that the trained model is not 100% accurate. There might be some instances where the file you upload will have the wrong output. 