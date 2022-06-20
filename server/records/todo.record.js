const {v4: uuid} = require('uuid');
const {pool} = require('../utils/db');

class TodoRecord {
  constructor(obj) {
    if (!obj.todo || obj.todo.length < 3 || obj.todo.length > 50) {
      throw new Error(
        'Todo must have at least 3 characters and less than 50 characters'
      );
    }

    this.id = obj.id;
    this.todo = obj.todo;
  }

  static async listAll() {
    const [results] = await pool.execute('SELECT * FROM `todos`');
    return results.map((obj) => new TodoRecord(obj));
  }

  static async getOne(id) {
    const [results] = await pool.execute(
      'SELECT * FROM `todos` WHERE `id` = :id',
      {
        id,
      }
    );
    return results.length === 0 ? null : new TodoRecord(results[0]);
  }

  async insert() {
    if (!this.id) {
      this.id = uuid();
    }

    await pool.execute('INSERT INTO `todos`(`id`,`todo`) VALUES(:id, :todo)', {
      id: this.id,
      todo: this.todo,
    });

    return this.id;
  }

  async update(id, todo) {
    await pool.execute('UPDATE `todos` SET `todo` = :todo WHERE `id` = :id', {
      id,
      todo,
    });
  }

  async delete() {
    await pool.execute('DELETE FROM `todos` WHERE `id` = :id', {
      id: this.id,
    });
  }
}

module.exports = {
  TodoRecord,
};
