const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
var cookieParser = require('cookie-parser');
var session = require('express-session');

const app = express();
const port = 3002;

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(session({ secret: "Shh, its a secret!", resave: false, saveUninitialized: true }));

// MongoDB connection
const url = "mongodb://127.0.0.1:27017";
const dbName = "FashionData";
let fashionCollection;
let userCollection;
let productCollection;

async function connectDB() {
  const client = new MongoClient(url);
  await client.connect();
  console.log("Connected to MongoDB successfully");
  const db = client.db(dbName);
  fashionCollection = db.collection("fashions");
  userCollection = db.collection("User");
  productCollection = db.collection("Product");

  // Seed User collection if empty
  const userCount = await userCollection.countDocuments();
  if (userCount === 0) {
    await userCollection.insertMany([
      { username: "tranduythanh", password: "123456" },
      { username: "admin", password: "admin123" },
      { username: "student", password: "student123" },
    ]);
    console.log("Seeded User collection with sample data");
  }

  // Seed Product collection if empty (Exercise 63)
  const productCount = await productCollection.countDocuments();
  if (productCount === 0) {
    await productCollection.insertMany([
      { name: "Diamond Promise Ring 1/6 ct tw Round-cut 10K White Gold", price: 399.99, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop", sku: "DR-001" },
      { name: "Diamond Promise Ring 1/4 ct tw Round/Baguette 10K White Gold", price: 529.00, image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=300&h=300&fit=crop", sku: "DR-002" },
      { name: "Diamond Promise Ring 1/6 ct tw Black/White Sterling Silver", price: 159.00, image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=300&h=300&fit=crop", sku: "DR-003" },
      { name: "Diamond Promise Ring 1/5 ct tw Round-cut Sterling Silver", price: 289.00, image: "https://images.unsplash.com/photo-1515562141589-67f0d569b40e?w=300&h=300&fit=crop", sku: "DR-004" },
      { name: "Diamond Promise Ring 1/5 ct tw Round-cut Sterling Silver", price: 289.00, image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=300&h=300&fit=crop", sku: "DR-005" },
      { name: "Diamond Promise Ring 1/8 ct tw Round-cut Sterling Silver Ring", price: 229.00, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop", sku: "DR-006" },
    ]);
    console.log("Seeded Product collection with sample data");
  }
}

connectDB().catch(console.error);

// GET all fashions
app.get("/fashions", cors(), async (req, res) => {
  const result = await fashionCollection.find({}).toArray();
  res.send(result);
});

// GET 1 fashion by ID
app.get("/fashions/:id", cors(), async (req, res) => {
  var o_id = new ObjectId(req.params["id"]);
  const result = await fashionCollection.find({ _id: o_id }).toArray();
  res.send(result[0]);
});

// ===== Cookie APIs (Exercise 60) =====

// Create Cookies
app.get("/create-cookie", cors(), (req, res) => {
  res.cookie("username", "tranduythanh")
  res.cookie("password", "123456")
  account = { "username": "tranduythanh", "password": "123456" }
  res.cookie("account", account)
  //Expires after 360000 ms from the time it is set.
  res.cookie("infor_limit1", 'I am limited Cookie - way 1', { expire: 360000 + Date.now() });
  res.cookie("infor_limit2", 'I am limited Cookie - way 2', { maxAge: 360000 });
  res.send("cookies are created")
})

// Read Cookies (with null check)
app.get("/read-cookie", cors(), (req, res) => {
  //cookie is stored in client, so we use req
  username = req.cookies.username
  password = req.cookies.password
  account = req.cookies.account
  infor = "username = " + username + "<br/>"
  infor += "password = " + password + "<br/>"
  if (account != null) {
    infor += "account.username = " + account.username + "<br/>"
    infor += "account.password = " + account.password + "<br/>"
  }
  res.send(infor)
})

// Clear Cookie
app.get("/clear-cookie", cors(), (req, res) => {
  res.clearCookie("account")
  res.send("[account] Cookie is removed")
})

// ===== Login API (Exercise 61) =====

// POST login - save cookie on success
app.post("/login", cors(), async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userCollection.findOne({ username: username, password: password });
    if (user) {
      res.cookie("loginUsername", username);
      res.cookie("loginPassword", password);
      res.json({ success: true, message: "Login successful", username: username });
    } else {
      res.json({ success: false, message: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET read login cookie
app.get("/read-login-cookie", cors(), (req, res) => {
  const loginUsername = req.cookies.loginUsername || "";
  const loginPassword = req.cookies.loginPassword || "";
  res.json({ username: loginUsername, password: loginPassword });
});

// ===== Session API (Exercise 62) =====

// Contact page with visit counter
app.get("/contact", cors(), (req, res) => {
  if (req.session.visited != null) {
    req.session.visited++
    res.send("You visited this page " + req.session.visited + " times")
  } else {
    req.session.visited = 1
    res.send("Welcome to this page for the first time!")
  }
})

// ===== Shopping Cart APIs (Exercise 63) =====

// GET all products
app.get("/products-list", cors(), async (req, res) => {
  try {
    const result = await productCollection.find({}).toArray();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST add product to cart (session)
app.post("/cart/add", cors(), (req, res) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  const product = req.body;
  // Check if product already in cart
  const existing = req.session.cart.find(item => item._id === product._id);
  if (existing) {
    existing.quantity += 1;
  } else {
    req.session.cart.push({ ...product, quantity: 1 });
  }
  res.json({ message: "Product added to cart", cart: req.session.cart });
});

// GET cart contents
app.get("/cart", cors(), (req, res) => {
  res.json(req.session.cart || []);
});

// POST update cart (update quantities)
app.post("/cart/update", cors(), (req, res) => {
  const updatedItems = req.body; // array of { _id, quantity }
  if (req.session.cart) {
    updatedItems.forEach(item => {
      const cartItem = req.session.cart.find(c => c._id === item._id);
      if (cartItem) {
        cartItem.quantity = item.quantity;
      }
    });
    // Remove items with quantity <= 0
    req.session.cart = req.session.cart.filter(c => c.quantity > 0);
  }
  res.json({ message: "Cart updated", cart: req.session.cart || [] });
});

// POST remove items from cart
app.post("/cart/remove", cors(), (req, res) => {
  const removeIds = req.body.ids; // array of _id strings
  if (req.session.cart) {
    req.session.cart = req.session.cart.filter(c => !removeIds.includes(c._id));
  }
  res.json({ message: "Items removed", cart: req.session.cart || [] });
});

app.listen(port, () => {
  console.log(`My server mongodb is running at http://localhost:${port}`);
});
