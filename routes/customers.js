const express = require('express');
const { Customer, validate } = require('../models/customer');

const router = express.Router();

// GET all customers
router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

// GET customer by id
router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer)
    return res.status(404).send('The customer with the given ID is not found!');

  res.send(customer);
});

// POST create new customer
router.post('/', async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const newCustomer = new Customer({
    ...req.body,
  });

  await newCustomer.save();

  res.send(newCustomer);
});

// PUT update customer by id
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );

  if (!customer) {
    return res.status(404).send('The customer with the given ID is not found!');
  }

  res.send(customer);
});

// DELETE customer by id
router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer) {
    return res.status(404).send('The customer with the given ID is not found!');
  }

  res.send(customer);
});

module.exports = router;
