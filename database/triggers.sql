-- Trigger to update total amount in orders table after inserting into order_details
CREATE OR REPLACE FUNCTION update_order_total() RETURNS TRIGGER AS $$
BEGIN
    UPDATE orders
    SET total_amount = (
        SELECT SUM(quantity * unit_price)
        FROM order_details
        WHERE order_id = NEW.order_id
    )
    WHERE order_id = NEW.order_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_order_total
AFTER INSERT OR UPDATE ON order_details
FOR EACH ROW
EXECUTE FUNCTION update_order_total();

-- Trigger to log changes in retail sales
CREATE OR REPLACE FUNCTION log_retail_sale_changes() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO retail_sale_log (invoice_no, change_type, change_date)
    VALUES (NEW.invoice_no, TG_OP, CURRENT_TIMESTAMP);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE retail_sale_log (
    log_id SERIAL PRIMARY KEY,
    invoice_no VARCHAR(50),
    change_type VARCHAR(10),
    change_date TIMESTAMP
);

CREATE TRIGGER trg_log_retail_sale_changes
AFTER INSERT OR UPDATE OR DELETE ON retailsale
FOR EACH ROW
EXECUTE FUNCTION log_retail_sale_changes();
