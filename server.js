const express = require('express');
const dummyData = require('./dummy-data.js');
const client = require('./redis');
const port = 2020;

const app = express();

app.get('/', async (req, res) => {
  try {
    const value = await client.get('key');
    if (value) {
      return res.status(200).json({
        status: true,
        data: JSON.parse(value),
      });
    } else {
      await client.set('key', JSON.stringify({ data: dummyData }));
      return res.status(200).json({
        status: true,
        data: dummyData,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
