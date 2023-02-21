# redis-pubsub

nodejs app with redis pub/sub

## Purpose
The app enables to set up a user in a frontend, save user name in redis database and publish a notification message via redis pub/sub to any subscriber. 

## Getting started
The app by default runs on port 3000.
### Set up redis

- Redis server: Start redis server via `docker run -d -p 6379:6379 redis` for redis server: https://redis.io/docs/getting-started/ 
- Redis Client
    - VS Code extension: cweijan redis client (as of writing this, v1.2.5): Add the redis server via the left redis menu by clicking on the '+' sign.
    - Redis client for nodejs: To use Redis with Node.js, you need to install a Node.js Redis client via `npm install redis`

### start application
in the working directory: run `node app.js` 
### subscribe a server to reveive messages from redis pub/sub
in the subscribe directory: run `node server.js` in separate terminal
### redis cli 
#### Open 
open redis-cli when redis runs in docker container: run `docker exec -it DOCKERNAME redis-cli ` in separate terminal
#### Query examples
App.js
- A redis Set is initalized when entering the first user in the frontend. 
- Get all members of set: `smembers Users`


Set up Hash (key-field-value) "Weather": 
- `hset Weather 20220914 sunny`
- `hset Weather 20220915 cloudy`
- Retrieve the weather from 22.09.2014: `hget Wetter 20220914`


