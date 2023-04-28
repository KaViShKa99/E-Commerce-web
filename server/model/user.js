const pool =  require("../config/db.js")
const jwt = require('jsonwebtoken');

class User {
    static async create(fname, lname, email, password) {
        const conn = await pool.getConnection();
        try {
            const sql = `INSERT INTO users (fname, lname, email, password) VALUES (?, ?, ?, ?)`;
            const [rows, fields] = await conn.execute(sql, [fname, lname, email ,password]);
            return rows.insertId;
        } catch (err) {
            console.error(`Error creating user ${fname }: ${err.message}`);
            throw err;
        } finally {
            conn.release();
        }
    }

    // static async findByUsername(username) {
    //     const conn = await pool.getConnection();
    //     try {
    //       const sql = `SELECT * FROM users WHERE username = ?`;
    //       const [rows, fields] = await conn.execute(sql, [username]);
    //       return rows[0];
    //     } catch (err) {
    //       console.error(`Error finding user ${username}: ${err.message}`);
    //       throw err;
    //     } finally {
    //       conn.release();
    //     }
    //   }
    
    static async findByEmailAndPassword(email,password) {
        const conn = await pool.getConnection();
        try {
            const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
            const [rows, fields] = await conn.execute(sql, [email,password]);
            return rows[0];
        } catch (err) {
            console.error(`Error finding user with email and password ${email} ${password}: ${err.message}`);
            throw err;
        } finally {
            conn.release();
        }
    }
    static async generateAuthToken(email) {
        const token = jwt.sign({ email: email }, 'your-secret-key');
        return token;
      }

}

module.exports = User;