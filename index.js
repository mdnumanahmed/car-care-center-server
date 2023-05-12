const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000

// mnumansyl
// zDDrnslPFhdWIL7p

// middleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@carcluster.bt452kw.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const serviceCollection = client.db('carCareCenter').collection('services')


    // services
    app.get('/services', async(req, res)=>{
        const cursor = serviceCollection.find()
        const services = await cursor.toArray()
        res.send(services)
    })

    app.get('/services/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};

      const options = {
        projection : {service_id: 1, title: 1, price: 1, img: 1}
      }

      const service = await serviceCollection.findOne(query, options);
      res.send(service)
    })
    


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res)=>{
    res.send('Car Care is running')
})

app.listen(port, ()=>{
    console.log(`Car Care Server is running on port: ${port}`);
})