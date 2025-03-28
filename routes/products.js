const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API for managing products
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 */
router.get("/", productController.getAllProducts);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Laptop"
 *               description:
 *                 type: string
 *                 example: "A brand new laptop"
 *               price:
 *                 type: number
 *                 example: 1299.99
 *               stock:
 *                 type: integer
 *                 example: 100
 *               created_at:
 *                 type: string
 *                 format: date-time
 *                 example: "2021-09-30T10:00:00.000Z"
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.post("/", productController.createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Laptop"
 *               description:
 *                 type: string
 *                 example: "An updated laptop"
 *               price:
 *                 type: number
 *                 example: 999.99
 *               stock:
 *                 type: integer
 *                 example: 50
 *               created_at:
 *                 type: string
 *                 format: date-time
 *                 example: "2021-09-30T10:00:00.000Z"
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
router.put("/:id", productController.updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the product
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product deleted successfully"
 *                 product:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Laptop"
 *                     description:
 *                       type: string
 *                       example: "A brand new laptop"
 *                     price:
 *                       type: number
 *                       example: 1299.99
 *                     stock:
 *                       type: integer
 *                       example: 100
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2021-09-30T10:00:00.000Z"
 *       400:
 *         description: Invalid product ID
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
// DELETE product by ID
router.delete("/:id", productController.deleteProduct);

module.exports = router;