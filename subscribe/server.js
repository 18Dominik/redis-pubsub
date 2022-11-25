  //Pub/Sub: Subscriber: https://blog.logrocket.com/using-redis-pub-sub-node-js/
  
  import { createClient } from 'redis';
  
  (async () => {
  
      const subscriber = createClient()
  
      const duplicate = subscriber.duplicate();
  
      await subscriber.connect()
    
      await duplicate.connect();
    
      await duplicate.subscribe('profil', (message) => {
        console.log(message); // 'message'
      });
    
    })();
      