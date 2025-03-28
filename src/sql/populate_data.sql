-- populate_data.sql
-- Insert sample products into the products table.
DO $$
BEGIN
    FOR i IN 1..10000 LOOP
        INSERT INTO products (name, description, price, inventory)
        VALUES ('Product ' || i, 'Description for product ' || i, round(random()*100,2), floor(random()*100));
    END LOOP;
END $$;
-- Insert sample customers into the customers table.