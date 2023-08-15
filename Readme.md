# redis-pubsub

nodejs app with redis pub/sub

- NoSQL vs. SQL: https://redis.com/nosql/what-is-nosql/
![image](https://user-images.githubusercontent.com/35842490/225006876-6f4cdf23-b108-43c3-ae0f-617193cd1176.png)

- Redis Docs: https://redis.io/docs/
![redis](https://github.com/18Dominik/redis-pubsub/assets/35842490/a9d35c50-ef66-4dc4-89c6-9804160407c1)


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

## Good to know
### Differences between webhooks and pub/sub
In a pub/sub system, message sources are decoupled from message consumers while in webhooks, the message producer is fully aware of the location of the consumer through the webhook URL.
### Difference between webhooks and polling
Polling involves periodically making requests to a system to check for new events or data. If new data is found, a response is returned with the new data in its payload. If no new data is available, nothing is returned.
To capture the difference between these two approaches with a relatable example, polling is like going to the post office to check if you have new mail. Using webhooks is basically having mail delivered to your house every time you have new mail simply by giving the postman your house address.
Polling requests are made by a client, while webhook requests are made by a server. Webhooks are also automatically triggered when an event occurs, whereas polling is set up to run at fixed intervals and runs whether there is a new event or not.
Polling can be resource-intensive and you need to make calls on whether the efforts will be fruitful or not. This is not the case for webhook requests, which are only made when there is new information.

![webhookvspolling](https://github.com/18Dominik/redis-pubsub/assets/35842490/e23d49ea-f8e5-4111-a8ae-68175bf17ed4)

### Source
https://hookdeck.com/webhooks/guides/when-to-use-webhooks#examples-of-sites-that-use-webhooks


