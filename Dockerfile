# Use a lightweight Node.js base image
FROM node:slim


# Install app dependencies
COPY package*.json ./
RUN npm ci

# Copy app source
COPY . .
ARG APP_MODE=$APP_MODE
ENV APP_MODE=$APP_MODE

RUN npm run build

# Expose the app port
EXPOSE 8080

# Start the app
CMD npx drizzle-kit migrate && node dist/src/app.js