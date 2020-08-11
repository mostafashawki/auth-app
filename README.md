# Authentication app

Web based application using the MERN stack to authenticate users (registration, login, verify phone number with SMS verification)

## Architecture

I use here a microservices architecture, with one API for authentication (Nodejs), and NEXMO for SMS verification, with Mongodb, and Reactjs in the frontend, and as CSS framework I use Material UI, and libphonenumber for phone number validation

## Installation & Run (Backend)

### Backend

cd backend

npm install

npm start

## Testing (Backend)

cd backend

npm test

## Frontend

cd frontend

npm install

npm start

## How To Use?

- Go to https://dashboard.nexmo.com/sign-up and register new account with your mobile number (you will get \$2 credit for free)
- Go to backend/.env and add your NEXMO_API_KEY and NEXMO_API_SECRET
- Then run the app as described
- Register new account
- Login
- Add your mobile number (The one which already registered at NEXMO platform)
- Add the OTP to verify your phone number, and you're done :)

Finally, this is just a side project not for production, it's about delivering an idea, so there's a lot of things we can consider in production, like:

- Use TypeScript
- Testing coverage (I just added an example)
- Handling some edge cases
- Use routing (I use Conditional Rendering for simplicity)
