# Online-Retail-v1
Advanced Database Systems Project: Optimizing Performance with PostgreSQL & Node.js
PostgreSQL Node.js Swagger

📌 Overview
This project focuses on optimizing database performance for an Online Retail dataset using PostgreSQL and Node.js. Key components include:

Normalized database schema design with partitioning and indexing.
RESTful API development (CRUD operations) using Express.js.
Automated API documentation with Swagger.
Query optimization via stored procedures and triggers.
Performance analysis using PostgreSQL's EXPLAIN ANALYZE.
Dataset: UCI Online Retail Dataset (541,909 records).

🛠️ Prerequisites
Node.js 18+ and npm
PostgreSQL 13+
Tools: Postman (API testing), OCI Account (Deployment)
🚀 Installation & Setup
1. Clone the Repository
git clone https://github.com/[benmckay]/advanced-dbs-project.git
cd advanced-dbs-project


Online Retail API
 1.0.0 
OAS 3.0
API documentation for the Online Retail system

Servers

http://localhost:5000/api-docs
Customers
API for managing customers



GET
/api/customers
Get all customers


POST
/api/customers
Create a new customer


GET
/api/customers/{id}
Get a customer by ID


PUT
/api/customers/{id}
Update a customer by ID


DELETE
/api/customers/{id}
Delete a customer by ID

Orders
Order management API



GET
/api/orders
Retrieve a list of orders


POST
/api/orders
Create a new order


GET
/api/orders/{id}
Retrieve a specific order by ID


PUT
/api/orders/{id}
Update an existing order


DELETE
/api/orders/{id}
Delete an order

Products
API for managing products



GET
/api/products
Get all products


POST
/api/products
Create a new product


PUT
/api/products/{id}
Update a product by ID


DELETE
/api/products/{id}
Delete a product by ID

RetailSales
API for managing retail sales



GET
/api/retailsales
Get all retail sales


POST
/api/retailsales
Create a new retail sale


GET
/api/retailsales/{invoice_no}
Get a retail sale by invoice_no


PUT
/api/retailsales/{invoice_no}
Update a retail sale by invoice_no


DELETE
/api/retailsales/{invoice_no}
Delete a retail sale by invoice_no
