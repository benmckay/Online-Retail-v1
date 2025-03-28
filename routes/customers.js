<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customer management API
 */

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Retrieve a list of customers
 *     tags: [Customers]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 100
 *         description: Number of customers per page
 *     responses:
 *       200:
 *         description: Successful retrieval of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 customers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       customer_id:
 *                         type: integer
 *                       first_name:
 *                         type: string
 *                       last_name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       registration_date:
 *                         type: string
 *                         format: date-time
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     totalCustomers:
 *                       type: integer
 *                     pageSize:
 *                       type: integer
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 100 } = req.query;
    const customers = await customerController.getCustomers(
      parseInt(page), 
      parseInt(limit)
    );
    res.json(customers);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/customers/{id}:
 *   get:
 *     summary: Retrieve a specific customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the customer
 *     responses:
 *       200:
 *         description: Successful retrieval of customer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 customer_id:
 *                   type: integer
 *                 first_name:
 *                   type: string
 *                 last_name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 registration_date:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Server error
 */
router.get('/:id', customerController.getCustomerById);

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: John
 *               last_name:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *     responses:
 *       201:
 *         description: Customer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 customer:
 *                   type: object
 *                   properties:
 *                     customer_id:
 *                       type: integer
 *                     first_name:
 *                       type: string
 *                     last_name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     registration_date:
 *                       type: string
 *                       format: date-time
 *       200:
 *         description: Customer already exists
 *       500:
 *         description: Server error
 */
router.post('/', customerController.createCustomer);

/**
 * @swagger
 * /api/customers/{id}:
 *   put:
 *     summary: Update an existing customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: John
 *               last_name:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 customer:
 *                   type: object
 *                   properties:
 *                     customer_id:
 *                       type: integer
 *                     first_name:
 *                       type: string
 *                     last_name:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Server error
 */
router.put('/:id', customerController.updateCustomer);

/**
 * @swagger
 * /api/customers/{id}:
 *   delete:
 *     summary: Delete a customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the customer
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 customer:
 *                   type: object
 *                   properties:
 *                     customer_id:
 *                       type: integer
 *                     first_name:
 *                       type: string
 *                     last_name:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Invalid customer ID
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
=======
const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: API for managing customers
 */

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: A list of customers
 */
router.get("/", customerController.getAllCustomers);

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *     responses:
 *       201:
 *         description: Customer created successfully
 */
router.post("/", customerController.createCustomer);

/**
 * @swagger
 * /api/customers/{id}:
 *   put:
 *     summary: Update a customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Name"
 *               email:
 *                 type: string
 *                 example: "updatedemail@example.com"
 *     responses:
 *       200:
 *         description: Customer updated successfully
 */
router.put("/:id", customerController.updateCustomer);

/**
 * @swagger
 * /api/customers/{id}:
 *   delete:
 *     summary: Delete a customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 */
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
// Compare this snippet from Online-Retail-v1/controllers/customerController.js:
// const pool = require("../db");
//
const pool = require("../db");
>>>>>>> c8a65bcf6f2e8f8b03cb4bf3a0116e806549f3c6
