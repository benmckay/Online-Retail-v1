-- triggers.sql
-- Function to update inventory when a new order is placed.
CREATE OR REPLACE FUNCTION update_inventory()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE products
    SET inventory = inventory - NEW.quantity
    WHERE id = NEW.product_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger that calls the update_inventory function after an order item is inserted.
CREATE TRIGGER trg_update_inventory
AFTER INSERT ON order_items
FOR EACH ROW
EXECUTE PROCEDURE update_inventory();
