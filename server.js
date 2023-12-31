const express = require('express');
require('dotenv').config()
const cors = require("cors");
const app = express();

// MY ROUTES
const userRoutes = require("./routes/user.routes")
const traderRoutes = require("./routes/trader.routes")
const customerRoutes = require("./routes/customer.routes")
const productsRoutes = require("./routes/products.routes")
const ordersRoutes = require("./routes/orders.routes")
const itemRoutes = require("./routes/item.routes")



// const tradeerRoutes = require("./routes/trader.routes")

const PORT = process.env.PORT;

const DB = require("./config/db.config")
const db = require('./models')

// var corsOptions = {
// origin: "http://localhost:8081"
//};

//app.use(cors(corsOptions));

app.use(express.json());



app.use(express.urlencoded({extended: true, limit: '50mb'}));

db.mongoose.connect(DB.db_url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
   .then(console.log("Connected successfully"))
   .catch(err=>{console.log("Error message : " + err)})

   
userRoutes(app)
traderRoutes(app)
customerRoutes(app)
productsRoutes(app)
ordersRoutes(app)
itemRoutes(app)


//  require("./routes/trader.routes")(app)

app.listen(PORT, () => {
    console.log(`Server is running @ ${PORT}.`)
});