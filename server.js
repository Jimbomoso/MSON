const express = require('express')
const app = express()
const PORT = 3000

app.get('/', (req,  res) => res.send('Howdy'))

app.listen(port, () => console.log('Server listening on @ http://localhost: ' + PORT))