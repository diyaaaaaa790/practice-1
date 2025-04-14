const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory database
let contacts = [];

// POST /contacts – Add a new contact
app.post('/contacts', (req, res) => {
  const { name, email, phone } = req.body;

  // 1. Validate required fields
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "Name, email, and phone are required." });
  }

  // 2. Check if phone is unique
  const exists = contacts.find(contact => contact.phone === phone);
  if (exists) {
    return res.status(400).json({ message: "Phone number must be unique." });
  }

  // 3. Create and store new contact
  const newContact = {
    id: contacts.length + 1,
    name,
    email,
    phone
  };

  contacts.push(newContact);
  res.status(201).json(newContact);
});

// GET /contacts – Retrieve all contacts
app.get('/contacts', (req, res) => {
  res.json(contacts);
});

// DELETE /contacts/:id – Remove a contact by ID
app.delete('/contacts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = contacts.findIndex(contact => contact.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Contact not found." });
  }

  contacts.splice(index, 1);
  res.json({ message: "Contact deleted successfully." });
});

// Server Start
app.listen(PORT, () => {
  console.log(`📞 Contact API running at http://localhost:${PORT}`);
});