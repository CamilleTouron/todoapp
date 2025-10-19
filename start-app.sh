#!/bin/bash

# Navigate to the backend API directory and start the server
cd todoapp-api
npm install
touch todoapp.db
npm start &
BACKEND_PID=$!

# Navigate to the frontend UI directory and start the development server
cd ../todoapp-ui
npm install
npm run dev &
FRONTEND_PID=$!

# Wait for both processes to finish
wait $BACKEND_PID $FRONTEND_PID
