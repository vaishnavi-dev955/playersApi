# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /playersBackend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your application listens on
EXPOSE 3000

# Define the command to start your application
CMD ["npm", "start"]

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your application listens on
EXPOSE 3000

# Define the command to start your application
CMD ["npm", "start"]