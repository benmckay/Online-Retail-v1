const db = require('../db');

class orderController {
  async getOrders(page = 1, limit = 100) {
    try {
      const offset = (page - 1) * limit;
      const query = `
        SELECT * FROM orders
        ORDER BY order_id
        LIMIT $1 OFFSET $2
      `;
      const result = await db.query(query, [limit, offset]);

      const countQuery = 'SELECT COUNT(*) FROM orders';
      const countResult = await db.query(countQuery);
      const totalOrders = parseInt(countResult.rows[0].count);

      return {
        orders: result.rows,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalOrders / limit),
          totalOrders,
          pageSize: limit,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async getOrderById(id) {
    try {
      const query = 'SELECT * FROM orders WHERE order_id = $1';
      const result = await db.query(query, [id]);

      if (result.rows.length === 0) {
        throw new Error('Order not found');
      }

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async createOrder(orderData) {
    try {
      const { customer_id, order_date, total_amount } = orderData;

      // Validate input
      if (!customer_id || !order_date || !total_amount) {
        throw new Error('customer_id, order_date, and total_amount are required');
      }

      // Insert new order (order_id will be auto-generated)
      const query = `
        INSERT INTO orders (customer_id, order_date, total_amount)
        VALUES ($1, $2, $3)
        RETURNING *
      `;
      const result = await db.query(query, [customer_id, order_date, total_amount]);

      return result.rows[0];
    } catch (error) {
      console.error('Error creating order:', error.message);
      throw error;
    }
  }

  async updateOrder(id, orderData) {
    try {
      const { customer_id, order_date, total_amount } = orderData;
      const query = `
        UPDATE orders
        SET customer_id = $1, order_date = $2, total_amount = $3
        WHERE order_id = $4
        RETURNING *
      `;
      const result = await db.query(query, [customer_id, order_date, total_amount, id]);

      if (result.rows.length === 0) {
        throw new Error('Order not found');
      }

      return {
        message: 'Order updated successfully',
        order: result.rows[0],
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteOrder(id) {
    try {
      const query = 'DELETE FROM orders WHERE order_id = $1 RETURNING *';
      const result = await db.query(query, [id]);

      if (result.rows.length === 0) {
        throw new Error('Order not found');
      }

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new orderController();
