const bcrypt = require('bcryptjs');
const db = require('../db/connection'); // Assuming there is a db connection file

class User {
  constructor(id, username, email, passwordHash, createdAt, updatedAt) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.passwordHash = passwordHash;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static async findByEmail(email) {
    const result = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (result.length) {
      const { id, username, email, password_hash, created_at, updated_at } = result[0];
      return new User(id, username, email, password_hash, created_at, updated_at);
    }
    return null;
  }

  static async findById(id) {
    const result = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    if (result.length) {
      const { id, username, email, password_hash, created_at, updated_at } = result[0];
      return new User(id, username, email, password_hash, created_at, updated_at);
    }
    return null;
  }

  static async create(username, email, password) {
    const passwordHash = await bcrypt.hash(password, 8);
    const result = await db.query(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, passwordHash]
    );
    if (result.affectedRows) {
      return new User(result.insertId, username, email, passwordHash);
    }
    throw new Error('User creation failed');
  }

  async comparePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.passwordHash);
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = User;
