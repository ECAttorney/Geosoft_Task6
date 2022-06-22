var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb')

const url = 'mongodb://127.0.0.1:27017' // connection URL
const client = new MongoClient(url) // mongodb client
const dbName = 'mydatabase' // database name
const collectionName = 'newpois' // collection name

/* Addition home page. */
router.get('/', function(req, res, next) 
{
  res.render('display', { title: 'Display Page' });
});

/*  */
router.delete('/displaypoi', function(req, res, next) 
{
  console.log("show poi")

 //console.log(req) // show the data that has been passed through the post query
  console.log("IT works")
  let poi = {}
  poi.poiname = req.body.pname
  poi.coordinates = req.body.longlat

  displayPOIfromDB(client, dbName, collectionName, poi, res)

})


// retrieve all elements from the database, and pass the results as input data for the search page
async function displayPOIfromDB(client, dbName, collectionName, poi, res) 
{

  await client.connect()

  console.log('Connected successfully to server')

  const db = client.db(dbName)

  const collection = db.collection(collectionName)
    console.log(poi.pname)

 
  console.log("1 document deleted")

  console.log("poi removed from the database")

  // pass the data added as input for the notification page 
 res.render('display_notification', {title: "Display Completed", newpoi: poi})

}


module.exports = router;