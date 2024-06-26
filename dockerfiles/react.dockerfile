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
COPY staging.env .env

# Build the React app
RUN npm run build

# Expose port 3000 to the outside world
EXPOSE 3000

# Run the React app
CMD ["npm", "start"]
