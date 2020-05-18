require('dotenv').config()

const express = require('express');
const morgan = require("morgan");
const mongoose = require('mongoose');



const db = mongoose.connection;
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost:27017/express-demo', {useNewUrlParser: true, useUnifiedTopology: true});
db.on('error', (err) => {
    console.log('DB connection error:', err.message);
})
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);




var booksRoute=require("./routes/books.route")
var usersRoute=require("./routes/users.route")
var authRoute=require("./routes/auth.route")
var cartRoute=require("./routes/cart.route")
var transactionsRoute=require("./routes/transactions.route")
var authMiddleware=require("./middlewares/auth.middleware")
var adminMiddleware=require("./middlewares/admin.middleware")
var apiUsersRoute=require("./api/routes/users.route")
var apiBooksRoute=require("./api/routes/books.route")
var apiTransactionsRoute=require("./api/routes/transactions.route")
var apiCartRoute=require("./api/routes/cart.route")
var apiAuthRoute=require("./api/routes/auth.route")
var cookieParser = require('cookie-parser')

const app = express();

const bodyParser = require('body-parser')
app.set('view engine', 'pug');
app.set('views', './views');
app.use(morgan("dev"));
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db

    })
}));
app.use("/books",booksRoute)
app.use("/api/books",apiBooksRoute)
app.use("/users",authMiddleware.requireAuth,usersRoute)
app.use("/api/users",apiUsersRoute)
app.use("/auth",authRoute)
app.use("/api/auth",apiAuthRoute)
app.use("/cart",cartRoute)
app.use("/api/cart",apiCartRoute)
app.use("/transactions",authMiddleware.requireAuth,adminMiddleware.admin, transactionsRoute)
app.use("/api/transactions",apiTransactionsRoute)


app.use(express.static('public'))

app.get('/', (request, response) => {
	console.log(request.session.cart)
  response.render("index");
});



// listen for requests :)
app.listen(3000, () => {
  console.log("Server listening on port 3000" );
});
