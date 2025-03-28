-- Insert sample products
INSERT INTO products (name, description, price) VALUES
('Laptop', 'A high-performance laptop', 1200.00),
('Smartphone', 'A latest-generation smartphone', 800.00),
('Headphones', 'Noise-cancelling headphones', 150.00);

-- Insert sample customers
INSERT INTO customers (first_name, last_name, email) VALUES
('John', 'Doe', 'john.doe@example.com'),
('Jane', 'Smith', 'jane.smith@example.com'),
('Alice', 'Johnson', 'alice.johnson@example.com');

-- Insert sample orders
INSERT INTO orders (customer_id, order_date, total_amount) VALUES
(1, '2023-10-01 10:00:00', 1350.00),
(2, '2023-10-02 14:30:00', 800.00);

-- Insert sample order details
INSERT INTO order_details (order_id, product_id, quantity, unit_price) VALUES
(1, 1, 1, 1200.00),
(1, 3, 1, 150.00),
(2, 2, 1, 800.00);

-- Insert sample retail sales
INSERT INTO retailsale (invoice_no, stock_code, description, quantity, invoice_date, unit_price, customer_id, country) VALUES
('INV001', 'STK001', 'Laptop', 2, '2023-10-01 10:00:00', 1200.00, 1, 'USA'),
('INV002', 'STK002', 'Smartphone', 1, '2023-10-02 14:30:00', 800.00, 2, 'Canada');
