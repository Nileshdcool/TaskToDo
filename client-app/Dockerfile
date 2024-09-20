# Use the official Node.js image to build the client app
FROM node:18 AS build
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the remaining files and build the client app
COPY . .
RUN yarn build

# Use the official Node.js image to run the client app
FROM node:18 AS runtime
WORKDIR /app
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/yarn.lock ./yarn.lock
RUN yarn install --production

# Expose the port and start the app
EXPOSE 3000
CMD ["yarn", "start"]