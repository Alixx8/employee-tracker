import pg from "pg"
import fs from "node:fs"
import path  from "node:path";

async function initDB() {
    const db = new pg.Pool({
        user: 'postgres',
        host: '127.0.0.1',
        database: 'postgres',
        port: 5432
    });

    const query = await fs.promises.readFile(path.resolve('db.schema'), 'utf8');
    await db.query(query);

    return db
}

async function getEmployees(dbConn) {
    return await dbConn.query('SELECT * FROM employees');
}

async function createEmployee(dbConn, employee) {
    return await dbConn.query('INSERT INTO employees(name, age, role, email) VALUES ($1, $2, $3, $4) RETURNING *', 
        [employee.name, employee.age, employee.role, employee.email]
    );
}

export default {
    initDB,
    getEmployees,
    createEmployee,
}