require('isomorphic-fetch')
const port = process.env.PORT || 5000;
const express = require('express')
const app = express()

// enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://glacial-tundra-36350.herokuapp.com");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/:querytype/:query', (req, res) => {

  let url
  switch (req.params.querytype) {
    case 'lattlong':
      url = `search/?lattlong=${req.params.query}`
      break;
    case 'search':
      url = `search/?query=${req.params.query}`
      break;
    case 'location':
      url = req.params.query
      break;
  }

  fetch(`https://www.metaweather.com/api/location/${url}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response)
      }
      return response.json()
    })
    .then(json => {
      console.log('json', json)
      res.send(json)
    })
    .catch(error => {
      console.log('error', error)
      res.send(error)
    })
})


app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
})
