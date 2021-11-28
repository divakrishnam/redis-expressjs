const createClient = require('redis').createClient;

const client = createClient();

(async () => {
  client.on('error', (err) => console.log('Redis Client Error', err));
  client.on('connect', function () {
    console.log('Connection Successful!!');
  });
  await client.connect();
})();

module.exports = client;
