# Benchscraper API
RESTful API to provide food pricing info scraped from the web

## Endpoints
view all scraped items, item attributes are name, price & seller

```GET /api/v1/items```

search api for a specific item based on name, price or seller

```GET /api/v1/items?attribute=value``` 

## Stack
* Node.js
* Mongodb & mongoose

## Setup
clone repo

install packages:
```npm install```

seed:
* [```npm install -g node-mongo-seeds```](https://www.npmjs.com/package/node-mongo-seeds)
* ```seed-setup```, and change the created json file to match your database environment
* ```mongod``` in a different shell instance
* ```NODE_ENV=<your environment> seed```

start server:
``` MONGODB_URI=<your mongodb location> npm start ```

query away!

## Tests
```npm test```
