# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source inside the Docker image
COPY . .

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV NODE_ENV production

# Run server.js when the container launches
CMD ["node", "server.js"]
