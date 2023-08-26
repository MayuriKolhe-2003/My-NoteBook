const connectToMongo = require("./db");
const express = require('express')
var cors = require('cors')

try {
    
    connectToMongo();
    console.log("connected");
} catch (error) {
    console.log(error);
}

const app = express()
const port = 5000

app.use(cors());
app.use(express.json())

//available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
    console.log(`iNotebook backend listening at http://localhost:${port}`)
  })
