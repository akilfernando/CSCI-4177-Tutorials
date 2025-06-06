import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

// --- Setup Express App ---
const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(express.json());
app.use(cors());

let products = [
  {
    id: '1',
    title: "Wireless Headphones",
    description: "Noise cancelling over-ear headphones with deep bass.",
    image: "https://res.cloudinary.com/da3w329cx/image/upload/v1683056487/samples/landscapes/nature-mountains.jpg",
    price: 120,
  },
  {
    id: '2',
    title: "Smart Watch",
    description: "Smart wearable with health tracking, notifications, and long battery life.",
    image: "https://res.cloudinary.com/da3w329cx/image/upload/v1683056500/cld-sample-5.jpg",
    price: 80,
  },
  {
    id: '3',
    title: "Laptop",
    description: "14-inch Full HD display, 256GB SSD, 8GB RAM. Perfect for productivity.",
    image: "https://res.cloudinary.com/da3w329cx/image/upload/v1683056499/cld-sample-3.jpg",
    price: 600,
  },
];

// --- Routes ---
app.get('/api/products', (req, res) => {
  res.status(200).json(products);
});

app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p.id === id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.post('/api/products', (req, res) => {
  const { title, image, description, price } = req.body;

  if (!title || !image || !description || !price) {
    return res.status(400).json({ message: 'Please provide all required fields: title, image, description, price' });
  }
  if (typeof price !== 'number' || price <= 0) {
    return res.status(400).json({ message: 'Price must be a positive number' });
  }

  const newProduct = {
    id: uuidv4(),
    title,
    image,
    description,
    price,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { title, image, description, price } = req.body;

  let productFound = false;
  products = products.map(product => {
    if (product.id === id) {
      productFound = true;
      if (!title || !image || !description || !price) {
        return res.status(400).json({ message: 'Please provide all required fields: title, image, description, price for update' });
      }
      if (typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ message: 'Price must be a positive number' });
      }
      return { ...product, title, image, description, price };
    }
    return product;
  });

  if (productFound) {
    const updatedProduct = products.find(p => p.id === id);
    res.status(200).json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = products.length;
  products = products.filter(p => p.id !== id);

  if (products.length < initialLength) {
    res.status(200).json({ message: 'Product deleted successfully' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// --- Server Start ---
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});