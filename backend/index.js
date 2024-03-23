const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const port = 5000;
const Razorpay = require('razorpay');

app.use(cors({origin:'https://artogram-backend.vercel.app/'}));
app.use(bodyParser.json());
const dburi = process.env.dbURI;
mongoose.connect(dburi, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});


const productSchema = new mongoose.Schema({
  productName: String,
  productType: String,
  imageUrl: String,
  price: Number,
  description: String,
  phonenumber: String,
  upiid : String,
});

const Product = mongoose.model('Product', productSchema);


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
const User = mongoose.model('User', userSchema);
const razorpay = new Razorpay({
  key_id: process.env.keyid,
  key_secret: process.env.keysecret
});

app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
})

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid =  bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      console.log('Invalid password');
      return res.status(401).json({ message: 'Invalid password' });
    }
    console.log('Login successful');
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const { productName, productType, imageUrl, price, description, phonenumber, upiid } = req.body;
    const product = new Product({
      productName,
      productType,
      imageUrl,
      price,
      description,
      phonenumber,
      upiid
    });
    await product.save();
    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/generate-payment-link', async (req, res) => {
  try {
    const { amount, currency, description, phonenumber, customer } = req.body;
    const options = {
      amount: amount,
      currency,
      description,
      phonenumber,
      customer,
    };
    const paymentLink = await razorpay.paymentLink.create(options);

    res.status(200).json({ paymentLink });
  } catch (error) {
    console.error('Error generating payment link:', error);
    res.status(500).json({ error: 'Failed to generate payment link' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});