import express from 'express';
import { createClient } from 'redis';

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//start app
const app = express()
const port = 3000

//start redis server
const client = createClient()
client.connect();

//GET method route
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// POST method route
//######################

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Access the parse results as request.body
app.post('/result', function (request, response) {
  var req = `First Name: ${request.body.fname}, Last Name: ${request.body.lname} `;
  client.sAdd("Users", [req]).then((err, reply) => { //Retrieve set entries by > smembers Users, Users as key, set of values as array. https://stackoverflow.com/questions/10451059/why-doesnt-redis-sadd-work-with-an-array-as-an-input-in-node-js ; https://stackovercoder.com.de/code/javascript/sadd+in+redis
    console.log("done");
  });
  console.log(req);
  let res = { "Status": "Ok", "Content": { "first name": request.body.fname, "last name": request.body.lname } }
  //response.sendStatus(202); //gives back "Accepted" -> no json
  response.send(res);/// gives back body -> json
  //Pub/Sub: Publischer: https://blog.logrocket.com/using-redis-pub-sub-node-js/
  (async () => {

    const user = {
      "First Name": request.body.fname,
      "Last name": request.body.lname,
      blog: 'New User updated in database',
    };

    await client.publish('profil', JSON.stringify(user));
  })();

});
//##########################


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

client.on('error', err => {
  console.log('Error ' + err);
});

//####Example for get/set values

/* client.set('Name', 'Dominik', (err, reply) => {
  if (err) throw err;
  console.log(reply);

  client.get('Name', (err, reply) => {
    if (err) throw err;
    console.log(reply);
  });
}); */

//################

//docker run -d -p 6379:6379 redis for redis server: https://redis.io/docs/getting-started/
//npm install redis:  To use Redis with Node.js, you need to install a Node.js Redis client. https://docs.redis.com/latest/rs/references/client_references/client_nodejs/
//Example for Sets in redis: 
/* client.sAdd("Users",['ReactJS', 'Angular', 'Svelte', 'VueJS', 'VueJS'], function(err, reply) {
  console.log(reply); // 4
}); */
//open redis-cli when redis runs in docker container: docker exec -it DOCKERNAME redis-cli    | https://stackoverflow.com/questions/54205691/access-redis-cli-inside-a-docker-container
// -it: https://docs.docker.com/engine/reference/run/  | For interactive processes (like a shell), you must use -i -t together in order to allocate a tty for the container process. -i -t is often written -it

