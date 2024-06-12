import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';

class Database {
    private static instance: Database;
    private db: sqlite3.Database;

    private constructor() {
        // Ensure the directory exists
        const dbDir = path.dirname('./database/database.db');
        if (!fs.existsSync(dbDir)) {
            fs.mkdirSync(dbDir, { recursive: true });
        }

        this.db = new sqlite3.Database('./database/database.db', (err) => {
            if (err) {
                console.error('Could not connect to database:', err.message);
            } else {
                console.log('Connected to database');
            }
        });

        this.db.run('CREATE TABLE IF NOT EXISTS tokens (id INTEGER PRIMARY KEY, token TEXT)', (err) => {
            if (err) {
                console.error('Error creating tokens table:', err.message);
            } else {
                console.log('Tokens table created or already exists');
            }
        });
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public close(): Promise<void> {
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

    public insertToken(token: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.run('INSERT INTO tokens (token) VALUES (?)', [token], (err) => {
                if (err) {
                    reject('Error inserting token: ' + err.message);
                } else {
                    resolve();
                }
            });
        });
    }
}

// Export the singleton instance
const db = Database.getInstance();
export default db;
