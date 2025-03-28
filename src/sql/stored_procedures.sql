-- stored_procedures.sql
-- Stored procedure to calculate total sales within a date range.
CREATE OR REPLACE FUNCTION calculate_total_sales(start_date DATE, end_date DATE)
RETURNS NUMERIC AS $$
DECLARE
    total_sales NUMERIC;
BEGIN
    SELECT SUM(oi.quantity * oi.price_at_purchase) INTO total_sales
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    WHERE o.order_date BETWEEN start_date AND end_date;
    RETURN total_sales;
END;
$$ LANGUAGE plpgsql;
