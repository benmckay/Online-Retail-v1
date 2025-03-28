<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management API
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Retrieve a list of orders
 *     tags: [Orders]
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
 *         description: Number of orders per page
 *     responses:
 *       200:
 *         description: Successful retrieval of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       order_id:
 *                         type: integer
 *                       customer_id:
 *                         type: integer
 *                       order_date:
 *                         type: date-time
 *                       total_amount:
 *                         type: float
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     totalOrders:
 *                       type: integer
 *                     pageSize:
 *                       type: integer
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 100 } = req.query;
    const orders = await orderController.getOrders(
      parseInt(page),
      parseInt(limit)
    );
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Retrieve a specific order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the order
 *     responses:
 *       200:
 *         description: Successful retrieval of order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order_id:
 *                   type: integer
 *                 customer_id:
 *                   type: integer
 *                 order_date:
 *                   type: date-time
 *                 total_amount:
 *                   type: float
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await orderController.getOrderById(parseInt(id));
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer_id
 *               - order_date
 *               - total_amount
 *             properties:
 *               customer_id:
 *                 type: integer
 *               order_date:
 *                 type: date-time
 *               total_amount:
 *                 type: float
 *           example:
 *             customer_id: 1
 *             order_date: 2021-01-01T00:00:00.000Z
 *             total_amount: 100.00
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 order:
 *                   type: object
 *                   properties:
 *                     order_id:
 *                       type: integer
 *                     customer_id:
 *                       type: integer
 *                     order_date:
 *                       type: date-time
 *                     total_amount:
 *                       type: float
 *       400:
 *         description: Invalid input
 *       409:
 *         description: Order already exists
 *       500:
 *         description: Server error
 */
router.post('/', async (req, res, next) => {
  try {
    const order = await orderController.createOrder(req.body);
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Update an existing order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: integer
 *               order_date:
 *                 type: date-time
 *               total_amount:
 *                 type: float
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 order:
 *                   type: object
 *                   properties:
 *                     customer_id:
 *                       type: integer
 *                     order_date:
 *                       type: date-time
 *                     total_amount:
 *                       type: float
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const orderData = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Order ID is required in the URL' });
    }

    const updatedOrder = await orderController.updateOrder(id, orderData);
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the order
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 order:
 *                   type: object
 *                   properties:
 *                     customer_id:
 *                       type: integer
 *                     order_date:
 *                       type: date-time
 *                     total_amount:
 *                       type: float
 *       400:
 *         description: Invalid order ID
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedOrder = await orderController.deleteOrder(parseInt(id));
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully', order: deletedOrder });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
=======
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API for managing orders
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: A list of orders
 */
router.get("/", orderController.getAllOrders);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: integer
 *                 example: 101
 *               totalAmount:
 *                 type: number
 *                 example: 250.75
 *     responses:
 *       201:
 *         description: Order created successfully
 */
router.post("/", orderController.createOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Update an order by ID
 *     tags: [Orders]
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
 *               totalAmount:
 *                 type: number
 *                 example: 199.99
 *     responses:
 *       200:
 *         description: Order updated successfully
 */
router.put("/:id", orderController.updateOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order deleted successfully
 */
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
// Compare this snippet from Online-Retail-v1/controllers/customerController.js:
// const pool = require("../db");
//
const pool = require("../db");
>>>>>>> c8a65bcf6f2e8f8b03cb4bf3a0116e806549f3c6
