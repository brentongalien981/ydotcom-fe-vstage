# Use the official Node.js image as a base
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Copy env file from the local folder to the Docker build context
# Make sure to have this env file for local-staging. Include it in .gitignore
# but not in .dockerignore.
COPY ./DELETE-ME/local-staging.env .env

# Build the React app
RUN npm run build

# Use nginx:alpine version 1.21.6 as the web server for serving the React app
FROM nginx:1.21.6-alpine

# Copy the built React app from the previous stage to the nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 
EXPOSE 80

# Command to run nginx
CMD ["nginx", "-g", "daemon off;"]
