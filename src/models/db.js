const { Client } = require('pg');

const dbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'Retail',
    password: 'Karanja8',
    port: 5432,
};

const connectToDatabase = async () => {
    const client = new Client(dbConfig);
    try {
        await client.connect();
        console.log("PostgreSQL connection is open");
        return client;
    } catch (error) {
        console.error("Error while connecting to PostgreSQL", error);
        throw error;
    }
};

module.exports = connectToDatabase;