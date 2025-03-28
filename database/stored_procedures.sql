-- Stored procedure to calculate total order amount
CREATE OR REPLACE FUNCTION calculate_order_total(order_id INT) RETURNS NUMERIC AS $$
DECLARE
    total NUMERIC(10, 2);
BEGIN
    SELECT SUM(quantity * unit_price) INTO total
    FROM order_details
    WHERE order_id = $1;

    RETURN total;
END;
$$ LANGUAGE plpgsql;

-- Stored procedure to get customer orders
CREATE OR REPLACE FUNCTION get_customer_orders(customer_id INT) RETURNS TABLE(
    order_id INT,
    order_date TIMESTAMP,
    total_amount NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT o.order_id, o.order_date, o.total_amount
    FROM orders o
    WHERE o.customer_id = $1;
END;
$$ LANGUAGE plpgsql;
