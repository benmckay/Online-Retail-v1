const express = require("express");
const router = express.Router();
const retailSaleController = require("../controllers/retailSaleController");

/**
 * @swagger
 * tags:
 *   name: RetailSales
 *   description: API for managing retail sales
 */

/**
 * @swagger
 * /api/retailsales:
 *   get:
 *     summary: Get all retail sales
 *     tags: [RetailSales]
 *     responses:
 *       200:
 *         description: A list of retail sales
 *      404:
 *        description: Retail sales not found
 */
router.get("/", retailSaleController.getAllRetailSales);

/**
 * @swagger
 * /api/retailsales/{invoice_no}:
 *   get:
 *     summary: Get a retail sale by invoice_no
 *     tags: [RetailSales]
 *     parameters:
 *       - in: path
 *         name: invoice_no
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single retail sale
 *       404:
 *         description: Retail sale not found
 */
router.get("/:invoice_no", retailSaleController.getRetailSaleByInvoiceNo);

/**
 * @swagger
 * /api/retailsales:
 *   post:
 *     summary: Create a new retail sale
 *     tags: [RetailSales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               invoice_no:
 *                 type: string
 *               stock_code:
 *                 type: string
 *               description:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               invoice_date:
 *                 type: string
 *                 format: date
 *               unit_price:
 *                 type: number
 *                 format: float
 *               customer_id:
 *                 type: integer
 *               country:
 *                 type: string
 *     responses:
 *       201:
 *         description: Retail sale created successfully
 */
router.post("/", retailSaleController.createRetailSale);

/**
 * @swagger
 * /api/retailsales/{invoice_no}:
 *   put:
 *     summary: Update a retail sale by invoice_no
 *     tags: [RetailSales]
 *     parameters:
 *       - in: path
 *         name: invoice_no
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
 *               stock_code:
 *                 type: string
 *               description:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               invoice_date:
 *                 type: string
 *                 format: date
 *               unit_price:
 *                 type: number
 *                 format: float
 *               customer_id:
 *                 type: integer
 *               country:
 *                 type: string
 *     responses:
 *       200:
 *         description: Retail sale updated successfully
 *       404:
 *         description: Retail sale not found
 */
router.put("/:invoice_no", retailSaleController.updateRetailSale);

/**
 * @swagger
 * /api/retailsales/{invoice_no}:
 *   delete:
 *     summary: Delete a retail sale by invoice_no
 *     tags: [RetailSales]
 *     parameters:
 *       - in: path
 *         name: invoice_no
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retail sale deleted successfully
 *       404:
 *         description: Retail sale not found
 */
router.delete("/:invoice_no", retailSaleController.deleteRetailSale);

module.exports = router; // Export the router directly, similar to the products module
