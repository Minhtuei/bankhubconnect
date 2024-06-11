import sqlite3 from 'sqlite3';

class Database {
    private db: sqlite3.Database;

    constructor() {
        this.db = new sqlite3.Database('./database/database.db', (err) => {
            if (err) {
                console.error('Could not connect to database', err);
            } else {
                console.log('Connected to database');
            }
        });
        this.db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT)');
        this.db.run('CREATE TABLE IF NOT EXISTS tokens (id INTEGER PRIMARY KEY, token TEXT, user_id INTEGER)');
    }

    close(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.close((err) => {
                if (err) {
                    reject('Error closing database: ' + err.message);
                } else {
                    resolve();
                }
            });
        });
    }
}
const db = new Database();

export default db;
