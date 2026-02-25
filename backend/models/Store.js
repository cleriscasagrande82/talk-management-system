const db = require('./db');

class Store {
    static async getAll() {
        const result = await db.query('SELECT * FROM stores');
        return result.rows;
    }

    static async getById(id) {
        const result = await db.query('SELECT * FROM stores WHERE id = $1', [id]);
        return result.rows[0];
    }

    static async create(name, location) {
        const result = await db.query('INSERT INTO stores (name, location) VALUES ($1, $2) RETURNING *', [name, location]);
        return result.rows[0];
    }

    static async update(id, name, location) {
        const result = await db.query('UPDATE stores SET name = $1, location = $2 WHERE id = $3 RETURNING *', [name, location, id]);
        return result.rows[0];
    }

    static async delete(id) {
        await db.query('DELETE FROM stores WHERE id = $1', [id]);
    }
}

module.exports = Store;